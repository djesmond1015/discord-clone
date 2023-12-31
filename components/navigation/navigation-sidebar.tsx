import { redirect } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';

import { CurrentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ModeToggle } from '@/components/mode-toggle';

import { NavigationAction } from './navigation-action';
import { NavigationItem } from './navigation-item';

export const NavigationSidebar = async () => {
  const profile = await CurrentProfile();

  if (!profile) {
    return redirect('/');
  }

  const servers = db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className='flex flex-col space-y-4 items-center h-full text-primary w-full dark:bg-[#1E1F22] bg-[#E3E5E8] py-3'>
      <NavigationAction />
      <Separator className='h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto' />
      <ScrollArea className='flex-1 w-full'>
        {(await servers).map((server) => (
          <div
            className='mb-4'
            key={server.id}
          >
            <NavigationItem
              id={server.id}
              imageUrl={server.imageUrl}
              name={server.name}
            />
          </div>
        ))}
      </ScrollArea>
      <div className='flex flex-col items-center pb-3 mt-auto gap-y-4'>
        <ModeToggle />
        <UserButton
          afterSignOutUrl='/'
          appearance={{
            elements: {
              avatarBox: 'h-[48px] w-[48px]',
            },
          }}
        />
      </div>
    </div>
  );
};
