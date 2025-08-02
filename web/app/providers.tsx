'use client';

import { SessionProvider } from 'next-auth/react';
import { TooltipProvider } from '@/components/ui/tooltip';
import React from 'react';
import { Toaster } from '@/components/ui/sonner';
import AuthWrapper from './AuthWrapper';
import { TanstackProvider } from '@/lib/tanstack-provider';
import { dmSans } from '@/lib/fonts';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <TanstackProvider>
      <SessionProvider>
        <AuthWrapper>
          <TooltipProvider>
            <Toaster
              toastOptions={{
                className: dmSans.className,
              }}
              position='top-right'
              richColors
              theme='light'
              closeButton
            />
            {children}
          </TooltipProvider>
        </AuthWrapper>
      </SessionProvider>
    </TanstackProvider>
  );
};

export default Providers;
