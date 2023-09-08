import { redirect } from 'next/navigation';
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from 'lucide-react';
import { ChannelType, MemberRole } from '@prisma/client';

import { CurrentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { ScrollArea } from '@/components/ui/scroll-area';

import { ServerHeader } from './server-header';
import { ServerSearch } from './server-serach';

interface ServerSidebarProps {
  serverId: string;
}

const channelIconMap = {
  [ChannelType.TEXT]: <Hash className='w-4 h-4 mr-2' />,
  [ChannelType.AUDIO]: <Mic className='w-4 h-4 mr-2' />,
  [ChannelType.VIDEO]: <Video className='w-4 h-4 mr-2' />,
};

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className='w-4 h-4 mr-2 text-indigo-500' />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className='w-4 h-4 mr-2 text-indigo-500' />,
};

export const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
  const profile = await CurrentProfile();

  if (!profile) {
    return redirect('/');
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: 'asc',
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  });

  const textChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );
  const members = server?.members.filter(
    (member) => member.profileId !== profile.id
  );

  if (!server) {
    return redirect('/');
  }

  const role = server.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  return (
    <div className='flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]'>
      <ServerHeader
        server={server}
        role={role}
      />
      <ScrollArea className='flex-1 px-3'>
        <div className='mt-2'>
          <ServerSearch
            data={[
              {
                label: 'Text Channels',
                type: 'channel',
                data: textChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: channelIconMap[channel.type],
                })),
              },
              {
                label: 'Voice Channels',
                type: 'channel',
                data: audioChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: channelIconMap[channel.type],
                })),
              },
              {
                label: 'Video Channels',
                type: 'channel',
                data: videoChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: channelIconMap[channel.type],
                })),
              },
              {
                label: 'Members',
                type: 'member',
                data: members?.map((member) => ({
                  id: member.id,
                  name: member.profile.name,
                  icon: roleIconMap[member.role],
                })),
              },
            ]}
          />
        </div>
      </ScrollArea>
    </div>
  );
};
