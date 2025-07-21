import { Skeleton } from '../ui/skeleton';

interface SkletonLoaderProps {
  count?: number;
}

export const SkletonLoader = ({ count = 3 }: SkletonLoaderProps) => (
  <div className='space-y-3'>
    {[...Array(count)].map((_, i) => (
      <Skeleton key={i} className='h-8 w-full' />
    ))}
  </div>
);
