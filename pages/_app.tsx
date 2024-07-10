  
import AppLayout from "@/components/layout/AppLayout";
import { AuthProvider } from "@/contexts/AuthContext";
import "@/styles/globals.css"; 

import { ChakraProvider } from "@chakra-ui/react";  
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

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
