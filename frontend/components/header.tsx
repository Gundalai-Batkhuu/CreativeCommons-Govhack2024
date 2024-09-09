import Link from 'next/link';
import {Session} from '@/lib/types'
import {auth} from '@/auth'
import {SidebarToggle} from './sidebar/sidebar-toggle'
import {UserMenu} from '@/components/user-menu'
import {Button} from './ui/button'
import Logo from './logo';

async function UserOrLogin() {
    const session = (await auth()) as Session

    return (
        <>
            {session?.user ? (
                <div className="flex items-center">
                    <UserMenu user={session.user}/>
                </div>
            ) : (
                <>
                    <Link href="/login">
                        <Button variant="ghost" className="text-base">
                            Login
                        </Button>
                    </Link>
                    <Link href="/signup">
                        <Button variant="ghost" className="text-base">
                            Sign Up
                        </Button>
                    </Link>
                </>
            )}
        </>
    )
}

export function Header() {
    return (
        <header
            className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
            <div className="flex items-center ml-4">
                <SidebarToggle/>
                <Logo />
                <Link href="/" className="text-xl font-bold text-primaryAccent">
                    Knowledge Commons
                </Link>
            </div>
            <div className="flex items-center justify-end space-x-4">
                <Link href="/">
                    <Button variant="ghost" className="text-base">
                        Search
                    </Button>
                </Link>
                <Link href="/chat">
                    <Button variant="ghost" className="text-base">
                        Chat
                    </Button>
                </Link>
                <Link href="/discussion-forum">
                    <Button variant="ghost" className="text-base">
                        Discussions
                    </Button>
                </Link>
                <Link href="/database-collection">
                    <Button variant="ghost" className="text-base">
                        Knowledge Pool
                    </Button>
                </Link>
                <UserOrLogin/>
            </div>
        </header>
    )
}