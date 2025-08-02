import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    name: string;
    avatarUrl?: string;
    token: string;
  }
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      avatarUrl?: string;
      token: string;
    };
  }

  interface JWT {
    id: string;
    email: string;
    name: string;
    avatarUrl?: string;
    token: string;
  }
}
