import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: string;
      classYear: 18 | 19 | 20 | 21;
      milestoneGroup?: number;
      isAdmin: boolean;
    } & DefaultSession['user'];
  }
}
