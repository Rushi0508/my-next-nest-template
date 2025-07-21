import { Loader } from 'lucide-react';

interface DataLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
}

export const DataLoader = ({ message, className, ...props }: DataLoaderProps) => {
  return (
    <div className={`flex h-[40vh] flex-col items-center justify-center gap-2 ${className || ''}`} {...props}>
      <Loader className='h-10 w-10 animate-spin' />
      {message}
    </div>
  );
};
