import Account from "@/components/Account";
import { createRequestClient } from "@/utils/supabase";
import { Profiles } from "@/utils/types";
import { Container } from "@chakra-ui/react";
import { Session } from "@supabase/supabase-js";
import { GetServerSidePropsContext } from "next";

interface AccountPageProps {
    session: Session;
    data: Profiles;
}

export default function AccountPage({ session, data }: AccountPageProps) {
    return (
        <Container>
            <Account session={session} initialData={data} />
        </Container>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { session, client } = await createRequestClient(context);

    if (!session) return { redirect: { destination: "/login" } };

    let { data } = await client
        .from("profiles")
        .select("username, website, avatar_url")
        .eq("id", session.user.id)
        .single();

    return {
        props: {
            data,
            session,
        },
    };
}
