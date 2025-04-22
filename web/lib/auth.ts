import { AuthOptions } from 'next-auth';

export const authOptions: AuthOptions = {
  providers: [],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === 'google') {
        const email = profile?.email;

        if (email) {
          console.log(`User signed in with email: ${email}`);
          return true;
        }
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update' && session?.user) {
        return { ...token, ...session.user };
      }
      if (user) {
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.token = token.token as string;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60,
  },
};
