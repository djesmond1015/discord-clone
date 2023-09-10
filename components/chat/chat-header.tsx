import { Hash } from 'lucide-react';

import { MobileToggle } from '@/components/mobile-toggle';

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: 'channel' | 'conversation';
}

export const ChatHeader = ({ serverId, name, type }: ChatHeaderProps) => {
  return (
    <div className='flex items-center h-12 px-3 font-semibold border-b-2 text-md bg-neutral-200 dark:bg-neutral-800'>
      <MobileToggle serverId={serverId} />
      {type === 'channel' && (
        <Hash className='w-5 h-5 mr-2 text-zinc-500 dark:text-zinc-400' />
      )}
      <p className='font-semibold text-black text-md dark:text-white'>{name}</p>
    </div>
  );
};
