import { type Session } from '@/lib/types'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { auth, signOut } from '@/auth'
import { IconStarRainbow } from './ui/icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export interface UserMenuProps {
  user: Session['user']
}

function getUserInitials(name: string) {
  const [firstName, lastName] = name.split(' ')
  return lastName ? `${firstName[0]}${lastName[0]}` : firstName.slice(0, 2)
}

export async function UserMenu({ user }: UserMenuProps) {
  const session = await auth()
  return (
    <div className="flex items-center justify-between">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="px-2">
            {/*<div className="flex size-7 shrink-0 select-none items-center justify-center rounded-full bg-muted/50 text-xs font-medium uppercase text-muted-foreground">
              {getUserInitials(user.email)}
  </div>*/}
            {session?.user ? (
              <Avatar className="size-8">
                <AvatarImage
                  src={
                    session.user.image ??
                    'https://source.boringavatars.com/marble/120'
                  }
                  alt={session.user.name ?? ''}
                />
              </Avatar>
            ) : (
              <IconStarRainbow className="size-6" />
            )}
            <span className="ml-1 md:block">{user.email}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={8} align="start" className="w-fit">
          <DropdownMenuItem className="flex-col items-start">
            <div className="text-xs text-zinc-500">{user.email}</div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <form
            action={async () => {
              'use server'
              await signOut()
            }}
          >
            <button className=" relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-xs outline-none transition-colors hover:bg-red-500 hover:text-white focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
              退出登录
            </button>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
