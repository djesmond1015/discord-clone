'use client';

import { useParams } from 'next/navigation';
import { Channel, ChannelType, MemberRole, Server } from '@prisma/client';
import { Edit, Hash, Lock, Mic, Trash, Video } from 'lucide-react';

import { cn } from '@/lib/utils';
import { ActionTooltip } from '@/components/action-tooltip';

interface ServerChannelProps {
  channel: Channel;
  server: Server;
  role?: MemberRole;
}

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Mic,
  [ChannelType.VIDEO]: Video,
};

export const ServerChannel = ({
  channel,
  server,
  role,
}: ServerChannelProps) => {
  const params = useParams();

  const Icon = iconMap[channel.type];

  return (
    <button
      className={cn(
        'group px-2 py-2 flex items-center rounded-md gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 mb-1 transition',
        params?.channelId === channel.id && 'bg-zinc-700/20 dark:bg-zinc-700'
      )}
    >
      <Icon className='flex-shrink-0 w-5 h-5 text-zinc-500 600 dark:text-zinc-400 ' />
      <p
        className={cn(
          'line-clamp-1 text-sm font-semibold text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition'
        )}
      >
        {channel.name}
      </p>
      {channel.name !== 'general' && role !== MemberRole.GUEST && (
        <div className='flex items-center ml-auto gap-x-2'>
          <ActionTooltip label='Edit'>
            <Edit className='hidden w-4 h-4 transition group-hover:block text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300' />
          </ActionTooltip>
          <ActionTooltip label='Delete'>
            <Trash className='hidden w-4 h-4 transition group-hover:block text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300' />
          </ActionTooltip>
        </div>
      )}
      {channel.name === 'general' && (
        <Lock className='w-4 h-4 ml-auto text-zinc-500 dark:text-zinc-400' />
      )}
    </button>
  );
};
