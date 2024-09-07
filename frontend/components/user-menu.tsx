import {type Session} from '@/lib/types'
import {Button} from './ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from './ui/dropdown-menu'
import {ProfileIcon} from "@/components/profile-icon";
import {SignoutForm} from "@/components/signout-form";
import { RemoveUserForm } from '@/components/remove-user-form';
import Link from 'next/link';


export interface UserMenuProps {
    user: Session['user']
}

export function UserMenu({user}: UserMenuProps) {
    const userName = "Admin"

    return (
        <div className="flex items-center justify-between">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="pl-0">
                        <div
                            className="flex size-8 shrink-0 select-none items-center justify-center rounded-full bg-muted/50 text-xs font-medium uppercase text-muted-foreground">
                            <ProfileIcon name={userName}/>
                        </div>
                        <span className="ml-2 hidden md:block">{userName}</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent sideOffset={8} align="start" className="w-fit">
                    <DropdownMenuItem className="flex-col items-start">
                        <div className="text-xs text-zinc-500"><Link href="/account">View Account</Link></div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex-col items-start text-xs text-zinc-500">
                        <RemoveUserForm email={user.email}/>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator/>
                    <SignoutForm/>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
