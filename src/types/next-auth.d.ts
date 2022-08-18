import { Gender, Major } from '@prisma/client';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: string;
      gender: Gender;
      major: Major;
      classYear: 18 | 19 | 20 | 21;
    } & DefaultSession['user'];
  }
}
