import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";

export async function createRequestClient(context: GetServerSidePropsContext) {
    const client = await createServerSupabaseClient(context);
    const {
        data: { session },
    } = await client.auth.getSession();

    return { session, client };
}
