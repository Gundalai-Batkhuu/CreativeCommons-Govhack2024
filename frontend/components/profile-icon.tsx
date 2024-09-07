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
        src="/avatar/av6e.png"
        alt="user"
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


