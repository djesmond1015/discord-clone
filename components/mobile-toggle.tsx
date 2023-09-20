import { Menu } from 'lucide-react';

import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ModifySheetContent } from '@/components/ui/modify/sheet-content-modify';
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
      <ModifySheetContent
        side='left'
        className='flex gap-0 p-0'
        close='hidden'
      >
        <div className='w-[72px]'>
          <NavigationSidebar />
        </div>
        <ServerSidebar serverId={serverId} />
      </ModifySheetContent>
    </Sheet>
  );
};
