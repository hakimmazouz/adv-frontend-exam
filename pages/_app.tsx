import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";
import { theme } from "@/utils/theme";

export default function App({
    Component,
    pageProps,
}: AppProps<{ initialSession: Session }>) {
    const [supabase] = useState(() => createBrowserSupabaseClient());

    return (
        <ChakraProvider theme={theme}>
            <SessionContextProvider
                supabaseClient={supabase}
                initialSession={pageProps.initialSession}
            >
                <Component {...pageProps} />
            </SessionContextProvider>
        </ChakraProvider>
    );
}
