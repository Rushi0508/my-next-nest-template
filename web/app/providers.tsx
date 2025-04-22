'use client';

import { SessionProvider } from 'next-auth/react';
import { TooltipProvider } from '@/components/ui/tooltip';
import React from 'react';
import { Toaster } from '@/components/ui/sonner';
import AuthWrapper from './AuthWrapper';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <AuthWrapper>
        <TooltipProvider>
          <Toaster
            toastOptions={{
              className: poppins.className,
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
  );
};

export default Providers;
