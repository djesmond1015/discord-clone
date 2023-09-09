'use client';

import qs from 'query-string';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { useModal } from '@/hooks/use-modal-store';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export const DeleteChannelModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === 'deleteChannel';
  const { server, channel } = data;

  const [isLoading, setIsLoading] = useState(false);

  const onDeleteChannel = async () => {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id,
        },
      });

      await axios.delete(url);

      onClose();
      router.refresh();
      router.push(`/servers/${server?.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={onClose}
    >
      <DialogContent className='p-0 overflow-hidden text-black bg-white'>
        <DialogHeader className='px-6 pt-8'>
          <DialogTitle className='text-2xl font-bold text-center'>
            Delete Channel
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            Are you sure you want do this? <br />
            <span className='font-semibold text-indigo-500'>
              #{channel?.name}
            </span>{' '}
            will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='px-6 py-4 bg-gray-100'>
          <div className='flex items-center justify-between w-full'>
            <Button
              onClick={onClose}
              disabled={isLoading}
              variant='ghost'
            >
              Cancel
            </Button>
            <Button
              onClick={onDeleteChannel}
              variant='primary'
              disabled={isLoading}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
