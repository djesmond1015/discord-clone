// PATCH DELETE

import { NextResponse } from 'next/server';

import { CurrentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await CurrentProfile();
    const { name, imageUrl } = await req.json();

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse('Image is required', { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        name,
        imageUrl,
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log('[SERVER_ID_PATCH]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await CurrentProfile();

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!params.serverId) {
      return new NextResponse('Server ID is required', { status: 400 });
    }

    const server = await db.server.delete({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log('[SERVER_ID_DELETE]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
