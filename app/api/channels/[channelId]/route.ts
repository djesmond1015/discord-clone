// PATCH DELETE

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { MemberRole } from '@prisma/client';
import { CurrentProfile } from '@/lib/current-profile';

export async function PATCH(
  req: Request,
  { params }: { params: { channelId: string } }
) {
  try {
    const profile = await CurrentProfile();
    const { searchParams } = new URL(req.url);
    const { name, type } = await req.json();

    const serverId = searchParams.get('serverId');

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 500 });
    }

    if (!params.channelId) {
      return new NextResponse('Channel ID is reuired', { status: 400 });
    }

    if (!serverId) {
      return new NextResponse('Server ID is required', { status: 400 });
    }

    if (name === 'general') {
      return new NextResponse('Channel name cannot be "general".', {
        status: 400,
      });
    }

    if (!name) {
      return new NextResponse('Channel name is required', { status: 400 });
    }

    const existingChannel = await db.channel.findFirst({
      where: {
        serverId,
        name,
        NOT: {
          id: params.channelId,
        },
      },
    });

    if (existingChannel) {
      return new NextResponse('Channel name already exists', { status: 409 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          update: {
            where: {
              id: params.channelId,
              NOT: {
                name: 'general',
              },
            },
            data: {
              name,
              type,
            },
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log('[CHANNEL_ID_PATCH]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { channelId: string } }
) {
  try {
    const profile = await CurrentProfile();
    const { searchParams } = new URL(req.url);

    const serverId = searchParams.get('serverId');

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!params.channelId) {
      return new NextResponse('Channel ID is reuired', { status: 400 });
    }

    if (!serverId) {
      return new NextResponse('Server ID is required', { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          delete: {
            id: params.channelId,
            name: {
              not: 'general',
            },
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log('[CHANNEL_ID_DELETE]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
