// types/next-auth.d.ts

import { DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface User extends DefaultUser {
    token?: string;
  }

  interface Session {
    user: {
      token?: string;
    };
  }
}
