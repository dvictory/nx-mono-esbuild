import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { theme } from '../lib/theme';
import Head from 'next/head';
const queryClient = new QueryClient();
import './styles.css';
function CustomApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to merchant-portal!</title>
      </Head>

      <ChakraProvider theme={theme}>
        <main className="app">
          <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>
              <Component {...pageProps} />
            </QueryClientProvider>
          </SessionProvider>
        </main>
      </ChakraProvider>
    </>
  );
}
export default CustomApp;
