'use client';
import { signOut } from 'next-auth/react';
import { verifyToken } from '@/helpers/validation.helpers';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { data } = useSession();
  useEffect(() => {
    if (data?.user.token) {
      verifyToken(data.user.token).then((payload) => {
        if (!payload) {
          signOut({
            callbackUrl: '/login',
          });
        }
      });
    }
  }, [data?.user.token]);
  return <>{children}</>;
};

export default AuthWrapper;
