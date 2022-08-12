import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import Date from '@/components/Navbar/Date';
import Navbar from '@/components/Navbar/Navbar';

const MyApp: AppType = ({ Component, pageProps }) => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true
      }
    }
  });
  return (
    <>
      <QueryClientProvider client={client}>
        <Date />
        <Navbar />
        <main className='animation:fade-in p-4 flex flex-col items-center'>
          <Component {...pageProps} />
        </main>
      </QueryClientProvider>
    </>
  );
};

export default MyApp;




