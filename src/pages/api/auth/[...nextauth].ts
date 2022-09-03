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
        session.user.milestoneGroup = user.milestoneGroup as any;
        session.user.isAdmin = user.isAdmin as any;
      }
      return session;
    },
    signIn({ user }) {
      const nimAwal = ['132', '135', '180', '181', '182', '183'];
      if (
        !nimAwal.some((awal) => user.email?.startsWith(awal)) ||
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
    async createUser(data) {
      const email = data.email as string;
      const classYear = Number(email.substring(3, 5));
      const major = email.substring(0, 3) === '135' ? 'IF' : 'STI';
      let milestoneGroup: number | null | undefined;
      if (classYear === 21) {
        milestoneGroup = await prisma.storedUser
          .findUnique({ where: { email }, select: { milestoneGroup: true } })
          .then((user) => user?.milestoneGroup);
        if (milestoneGroup) {
          await prisma.storedUser.delete({ where: { email } });
        }
      }
      return prisma.user.create({
        // @ts-ignore
        data: { ...data, classYear, major, milestoneGroup },
      });
    },
  },
  providers: [
    GoogleProvider({
      clientId: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    error: '/',
  },
};

export default NextAuth(authOptions);
