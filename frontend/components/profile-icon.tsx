import * as Avatar from "@radix-ui/react-avatar";

interface ProfileIconProps {
  name: string;
}

function getUserInitials(name: string) {
    const [firstName, lastName] = name.split(' ')
    return lastName ? `${firstName[0]}${lastName[0]}` : firstName.slice(0, 2)
}

export function ProfileIcon({ name }: ProfileIconProps) {

  return (
    <Avatar.Root
      className="flex size-8 shrink-0 select-none items-center justify-center rounded-full bg-muted/50 text-xs font-medium uppercase text-muted-foreground"
    >
      <Avatar.Image
        className="h-full w-full rounded-[inherit] object-cover"
        src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
        alt="Pedro Duarte"
      />
      <Avatar.Fallback
        className="flex h-full w-full items-center justify-center"
        delayMs={600}
      >
        {getUserInitials(name)}
      </Avatar.Fallback>
    </Avatar.Root>
  );
}


