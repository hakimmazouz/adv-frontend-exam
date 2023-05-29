import { createRequestClient } from "@/utils/supabase";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { GetServerSidePropsContext } from "next";

export default function Login() {
    const client = createBrowserSupabaseClient();

    return (
        <Auth
            supabaseClient={client}
            appearance={{ theme: ThemeSupa }}
            theme="dark"
        />
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
