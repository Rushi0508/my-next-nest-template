import React from 'react';

interface EmptyMessageProps {
  message: string;
  description: string;
  cta?: React.ReactNode;
}

const EmptyMessage = ({
  message = 'No Data Found',
  description = 'Check back later for new data.',
  cta,
}: EmptyMessageProps) => {
  return (
    <div className='flex h-[200px] flex-col items-center justify-center gap-2 text-center'>
      <p className='text-lg font-semibold text-muted-foreground'>{message}</p>
      <p className={`text-sm text-muted-foreground ${cta ? 'mb-2' : ''}`}>{description}</p>
      {cta && cta}
    </div>
  );
};

export default EmptyMessage;
