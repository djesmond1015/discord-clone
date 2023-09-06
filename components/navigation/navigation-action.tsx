'use client';

import { Plus } from 'lucide-react';

import { ActionTooltip } from '@/components/action-tooltip';
import { useModal } from '@/hooks/use-modal-store';

export const NavigationAction = () => {
  const { onOpen } = useModal();

  return (
    <div>
      <ActionTooltip
        side='right'
        align='center'
        label='Add a server'
      >
        <button
          onClick={() => onOpen('createServer')}
          className='flex items-center group'
          type='button'
          aria-label='Add a server'
        >
          <div className='flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500'>
            <Plus className='transition text-emerald-500 group-hover:text-white' />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};
