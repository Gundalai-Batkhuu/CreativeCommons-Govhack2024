'use server'

import { signIn, signOut } from '@/auth'
import { ResultCode, getStringFromBuffer } from '@/lib/utils'
import { z } from 'zod'
import { kv } from '@vercel/kv'
import { getUser } from '../login/actions'
import { AuthError } from 'next-auth'
import { userService } from '@/lib/services/user-service';

export async function createUser(
  email: string,
  hashedPassword: string,
  salt: string
) {
  const existingUser = await getUser(email)

  if (existingUser) {
    return {
      type: 'error',
      resultCode: ResultCode.UserAlreadyExists
    }
  } else {
    const user = {
      id: crypto.randomUUID(),
      email,
      password: hashedPassword,
      salt
    }

    try {
      // Create user in Redis
      await kv.hmset(`user:${email}`, user)

      // Create user in the backend database
      await userService.createUser(user.id, email)

      return {
        type: 'success',
        resultCode: ResultCode.UserCreated
      }
    } catch (error) {
      console.error('Failed to create user:', error)

      // Attempt to clean up Redis in case of failure
      try {
        await kv.del(`user:${email}`)
      } catch (cleanupError) {
        console.error('Failed to clean up Redis after user creation error:', cleanupError)
      }

      return {
        type: 'error',
        resultCode: ResultCode.UnknownError
      }
    }
  }
}

interface Result {
  type: string
  resultCode: ResultCode
}

export async function signup(
  _prevState: Result | undefined,
  formData: FormData
): Promise<Result | undefined> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const parsedCredentials = z
    .object({
      email: z.string().email(),
      password: z.string().min(6)
    })
    .safeParse({
      email,
      password
    })

  if (parsedCredentials.success) {
    const salt = crypto.randomUUID()

    const encoder = new TextEncoder()
    const saltedPassword = encoder.encode(password + salt)
    const hashedPasswordBuffer = await crypto.subtle.digest(
      'SHA-256',
      saltedPassword
    )
    const hashedPassword = getStringFromBuffer(hashedPasswordBuffer)

    try {
      const result = await createUser(email, hashedPassword, salt)

      if (result.resultCode === ResultCode.UserCreated) {
        await signIn('credentials', {
          email,
          password,
          redirect: false
        })
      }

      return result
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return {
              type: 'error',
              resultCode: ResultCode.InvalidCredentials
            }
          default:
            return {
              type: 'error',
              resultCode: ResultCode.UnknownError
            }
        }
      } else {
        return {
          type: 'error',
          resultCode: ResultCode.UnknownError
        }
      }
    }
  } else {
    return {
      type: 'error',
      resultCode: ResultCode.InvalidCredentials
    }
  }
}

export async function removeUser(email: String): Promise<Result> {
  try {
    // Remove user from Redis
    await kv.del(`user:${email}`)

    // Remove user from backend database
    // Note: We're assuming userService has a method to delete a user. If it doesn't, you'll need to add one.
    // await userService.deleteUser(email)

    await signOut({ redirect: false })

    return {
      type: 'success',
      resultCode: ResultCode.UserRemoved
    }
  } catch (error) {
    console.error('Failed to remove user:', error)
    return {
      type: 'error',
      resultCode: ResultCode.UnknownError
    }
  }
}