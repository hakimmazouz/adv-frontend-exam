import { Card, Deck } from "@/utils/types";
import {
    Box,
    Button,
    Card as ChakraCard,
    CardBody,
    CardHeader,
    Flex,
    Heading,
    IconButton,
    Link,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Text,
} from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function DeckCard({
    deck,
}: {
    deck: Deck & { cards: (Card & { count: number })[] };
}) {
    const supabase = useSupabaseClient();
    const router = useRouter();
    const deleteDeck = useCallback(async () => {
        await supabase.from("decks").delete().eq("id", deck.id);

        router.replace(router.asPath);
    }, []);

    return (
        <Link as={NextLink} href={`/decks/${deck.id}`}>
            <ChakraCard>
                <CardHeader>
                    <Flex justifyContent="space-between" alignItems="center">
                        <Heading size="md">{deck.name}</Heading>
                        <Popover>
                            <PopoverTrigger>
                                <IconButton
                                    variant="ghost"
                                    colorScheme="gray"
                                    aria-label="See menu"
                                    icon={<BsThreeDotsVertical />}
                                />
                            </PopoverTrigger>
                            <PopoverContent>
                                <Button colorScheme="red" onClick={deleteDeck}>
                                    Delete
                                </Button>
                            </PopoverContent>
                        </Popover>
                    </Flex>
                </CardHeader>
                <CardBody>{deck.cards[0].count}</CardBody>
            </ChakraCard>
        </Link>
    );
}
