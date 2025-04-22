import { Loader2 } from 'lucide-react';
import React from 'react';

const GlobalLoading = () => {
  return (
    <div className='absolute left-0 top-0 z-50 h-dvh w-full'>
      <div className={`flex h-full w-full items-center justify-center`}>
        <Loader2 size={50} className='animate-spin' />
      </div>
    </div>
  );
};

export default GlobalLoading;
