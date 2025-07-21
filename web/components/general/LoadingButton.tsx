import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingButtonProps extends ButtonProps {
  isLoading?: boolean;
  showChildren?: boolean;
}

const LoadingButton = ({ isLoading, children, className, showChildren = true, ...props }: LoadingButtonProps) => {
  return (
    <Button className={cn(className)} disabled={isLoading} {...props}>
      {isLoading ? (
        <div className='flex items-center gap-2'>
          <Loader2 className='h-4 w-4 animate-spin' />
          {showChildren ? children : null}
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default LoadingButton;
