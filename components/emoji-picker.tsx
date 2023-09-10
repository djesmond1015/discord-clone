'use client';

import { useTheme } from 'next-themes';
import { Smile } from 'lucide-react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface EmojiPickProps {
  onChange: (value: string) => void;
}

export const EmojiPicker = ({ onChange }: EmojiPickProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger>
        <Smile className='transition text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300' />
      </PopoverTrigger>
      <PopoverContent
        side='right'
        sideOffset={30}
        className='mb-16 bg-transparent border-none shadow-none drop-shadow-none'
      >
        <Picker
          theme={resolvedTheme}
          data={data}
          onEmojiSelect={(emoji: any) => onChange(emoji.native)}
        />
      </PopoverContent>
    </Popover>
  );
};
