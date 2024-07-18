  

import "@/styles/globals.css"; 
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { ChakraProvider } from "@chakra-ui/react";  
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import AppLayout from "@/components/layout/AppLayout";
import { AuthProvider } from "@/contexts/AuthContext";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
       <ChakraProvider>
       <AuthProvider>

        <AppLayout>
      <Component {...pageProps} />
      </AppLayout>
      </AuthProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}
