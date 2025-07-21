'use client';
import { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileDeviceMessage from './MobileDeviceMessage';

export default function DeviceCheck({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const [shouldShow, setShouldShow] = useState(true);

  useEffect(() => {
    setShouldShow(!isMobile);
  }, [isMobile]);

  if (!shouldShow) {
    return <MobileDeviceMessage deviceType='mobile' />;
  }

  return <>{children}</>;
}
