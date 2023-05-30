import { createRequestClient } from "@/utils/supabase";
import { Container } from "@chakra-ui/react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login() {
    const client = createBrowserSupabaseClient();
    const router = useRouter();

    useEffect(() => {
        const {
            data: { subscription },
        } = client.auth.onAuthStateChange((_event, session) => {
            if (session?.user) router.push("/");
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <Container
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ height: "100vh" }}
        >
            <Auth
                providers={[]}
                supabaseClient={client}
                appearance={{ theme: ThemeSupa }}
            />
        </Container>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { session } = await createRequestClient(context);

    if (session) return { redirect: { destination: "/" } };

    return {
        props: {
            initialSession: session,
        },
    };
}
