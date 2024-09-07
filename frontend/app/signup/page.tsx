import SignupForm from '@/components/signup-form';
import {Session} from '@/lib/types'
import {auth} from '@/auth'
import { redirect } from 'next/navigation'

export default async function SignupPage() {
    const session = (await auth()) as Session

    if (session) {
        redirect('/')
    }

    return (
        <main className="flex flex-col p-4 my-20">
            <SignupForm/>
        </main>
    );
};
