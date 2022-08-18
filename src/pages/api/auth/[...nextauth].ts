import NextAuth, { type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { env } from '../../../env/server.mjs';
import { prisma } from '../../../server/db/client';

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.classYear = user.classYear as any;
        session.user.major = user.major as any;
        session.user.gender = user.gender as any;
      }
      return session;
    },
    signIn({ user }) {
      if (
        !(user.email?.startsWith('135') || user.email?.startsWith('182')) ||
        !user.email?.endsWith('@std.stei.itb.ac.id')
      ) {
        return false;
      }
      return true;
    },
  },
  // Configure one or more authentication providers
  adapter: {
    ...PrismaAdapter(prisma),
    createUser(data) {
      const email = data.email as string;
      const classYear = Number(email.substring(3, 5));
      const major = email.substring(0, 3) === '135' ? 'IF' : 'STI';
      // @ts-ignore
      return prisma.user.create({ data: { ...data, classYear, major } });
    },
  },
  providers: [
    GoogleProvider({
      clientId: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);
