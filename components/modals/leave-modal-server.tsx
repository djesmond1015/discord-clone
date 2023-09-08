'use client';

import { useState } from 'react';
import axios from 'axios';

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

export const LeaveServerModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === 'leaveServer';
  const { server } = data;

  const [isLoading, setIsLoading] = useState(false);

  const onLeaveServer = async () => {
    try {
      setIsLoading(true);

      await axios.patch(`/api/servers/${server?.id}/leave`);
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
            Leave Server
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            Are you sure you want to leave
            <span className='font-semibold text-indigo-500'>
              {server?.name}
            </span>
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
              onClick={onLeaveServer}
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
