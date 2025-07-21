import { Loader2 } from 'lucide-react';
import React from 'react';

type Props = {
  className?: string;
};

const LoadingScreen = (props: Props) => {
  return (
    <div className={`flex h-full w-full items-center justify-center ${props.className ?? ''}`}>
      <Loader2 size={50} className='animate-spin' />
    </div>
  );
};

export default LoadingScreen;
