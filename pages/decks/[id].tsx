import RecallCard from "@/components/RecallCard";
import { createRequestClient } from "@/utils/supabase";
import { Card, Deck } from "@/utils/types";
import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    SimpleGrid,
} from "@chakra-ui/react";
import { Session, useSupabaseClient } from "@supabase/auth-helpers-react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useCallback } from "react";

interface DeckPageProps {
    deck: Deck & { cards: Card[] };
}

export default function DeckPage({ deck }: DeckPageProps) {
    const supabase = useSupabaseClient();
    const router = useRouter();
    const createCard = useCallback(async () => {
        await supabase.from("cards").insert({
            frontside_content: "Frontside",
            backside_content: "Backside",
            deck_id: deck.id,
        });

        router.replace(router.asPath);
    }, [supabase]);

    return (
        <Container maxWidth={1000}>
            <Flex justify="space-between" pb={20} pt={40} alignItems="center">
                <Heading size="2xl">Decks</Heading>
                <Button onClick={createCard}>Create card</Button>
            </Flex>
            <SimpleGrid columns={2} spacing={6}>
                {deck.cards.map((card) => (
                    <RecallCard key={card.id} card={card} />
                ))}
            </SimpleGrid>
        </Container>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { session, client } = await createRequestClient(context);

    if (!session) return { redirect: { destination: "/" } };

    const { data, error } = await client
        .from("decks")
        .select(
            `
            id,
            name,
            cards (
                id,
                frontside_content,
                backside_content
            )
        `
        )
        .order("id", { foreignTable: "cards", ascending: false })
        .eq("id", context.params?.id)
        .single();

    if (!data) return { redirect: { destination: "/" } };

    const cardData = await client
        .from("cards")
        .select(
            `
            id,
            frontside_content,
            backside_content,
            decks (
                id,
                name
            )
    `
        )
        .eq("deck_id", context.params?.id)
        .single();

    return {
        props: {
            initialSession: session,
            deck: data,
        },
    };
}
