import React from 'react'
import { signOut } from '@/auth'


export function SignoutForm() {

    return (
        <form
            action={async () => {
                'use server'
                await signOut()
            }}
        >
            <button
                className="relative flex w-full select-none items-center rounded-sm px-2 py-1.5 text-sm font-semibold text-zinc-900 dark:text-zinc-100 outline-none transition-colors hover:bg-red-500 hover:text-white focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                Sign Out
            </button>
        </form>
    )
}