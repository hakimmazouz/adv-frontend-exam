import { createRequestClient } from "@/utils/supabase";
import { Container } from "@chakra-ui/react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { GetServerSidePropsContext } from "next";

export default function Login() {
    const client = createBrowserSupabaseClient();

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
                redirectTo={process.env.NEXT_PUBLIC_SITE_URL}
            />
        </Container>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { session } = await createRequestClient(context);

    if (session) return { redirect: "/" };

    return {
        props: {
            initialSession: session,
        },
    };
}
