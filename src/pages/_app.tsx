import { withTRPC } from '@trpc/next';
import { SessionProvider } from 'next-auth/react';
import type { AppType } from 'next/dist/shared/lib/utils';
import Script from 'next/script.js';
import superjson from 'superjson';
import { env } from '../env/client.mjs';
import type { AppRouter } from '../server/router';
import '../styles/globals.css';

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <Script
        src="https://accounts.google.com/gsi/client"
        id="google"
        async
        defer
        onLoad={() => {
          google.accounts.id.initialize({
            client_id: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            allowed_parent_origin: [env.NEXT_PUBLIC_URL, 'http://localhost'],
            login_uri: env.NEXT_PUBLIC_URL + '/api/auth/callback/google',
            callback(credentialResponse) {
              console.log(credentialResponse);
            },
          });
          google.accounts.id.prompt((p) => {
            console.log(p);
          });
        }}
      />
    </SessionProvider>
  );
};

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return '';
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
