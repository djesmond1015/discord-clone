'use client';

import Image from 'next/image';
import { X } from 'lucide-react';

import { UploadDropzone } from '@/lib/uploadthing';

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: 'messageFile' | 'serverImage';
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onChange,
  value,
  endpoint,
}) => {
  const fileType = value?.split('.').pop();

  if (value && fileType !== 'pdf') {
    return (
      <div className='relative w-20 h-20'>
        <Image
          src={value}
          fill
          alt='Upload Image'
          className='rounded-full'
        />
        <button
          type='button'
          className='absolute top-0 right-0 p-1 text-white rounded-full shadow-sm bg-rose-500'
          onClick={() => onChange('')}
        >
          <X className='w-4 h-4' />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        console.log(res);
        onChange(res?.[0].url);
      }}
      onUploadError={(err: Error) => {
        console.log(err);
      }}
    />
  );
};
