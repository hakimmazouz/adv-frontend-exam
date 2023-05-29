import { GetServerSidePropsContext } from "next";
import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    SimpleGrid,
} from "@chakra-ui/react";
import { Card, Deck } from "@/utils/types";
import { createRequestClient } from "@/utils/supabase";
import { useRouter } from "next/router";
import {
    Session,
    useSupabaseClient,
    useUser,
} from "@supabase/auth-helpers-react";
import { useCallback } from "react";
import DeckCard from "@/components/DeckCard";

interface HomePageProps {
    decks: (Deck & { cards: (Card & { count: number })[] })[];
}

export default function Home({ decks }: HomePageProps) {
    const supabase = useSupabaseClient();
    const user = useUser();
    const router = useRouter();
    const createDeck = useCallback(async () => {
        await supabase
            .from("decks")
            .insert({ name: "Untitled deck", user_id: user?.id });

        router.replace(router.asPath);
    }, [supabase]);

    return (
        <Container maxWidth={1000}>
            <Flex justify="space-between" pb={20} pt={40} alignItems="center">
                <Heading size="2xl">Decks</Heading>
                <Button onClick={createDeck}>Create new deck</Button>
            </Flex>
            <SimpleGrid columns={3} spacing={6}>
                {decks.map((deck) => (
                    <DeckCard key={deck.id} deck={deck} />
                ))}
            </SimpleGrid>
        </Container>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { client, session } = await createRequestClient(context);

    if (!session)
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };

    const { data } = await client
        .from("decks")
        .select("*, cards(count)")
        .eq("user_id", session.user.id);

    return {
        props: {
            initialSession: session,
            decks: data,
        },
    };
}
