import { Menu } from 'lucide-react';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { NavigationSidebar } from '@/components/navigation/navigation-sidebar';
import { ServerSidebar } from '@/components/server/server-sidebar';

interface MobileToggleProps {
  serverId: string;
}

export const MobileToggle = ({ serverId }: MobileToggleProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='md:hidden'
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent
        side='left'
        className='flex gap-0 p-0'
      >
        <div className='w-[72px]'>
          <NavigationSidebar />
        </div>
        <ServerSidebar serverId={serverId} />
      </SheetContent>
    </Sheet>
  );
};