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
    Editable,
    EditableInput,
    EditablePreview,
} from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { motion } from "framer-motion";
import { debounce } from "lodash";
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
    const updateName = useCallback(async (value: string) => {
        const { error } = await supabase
            .from("decks")
            .update({ name: value })
            .eq("id", deck.id);
    }, []);

    return (
        <motion.div
            layout
            exit={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
        >
            <Link as={NextLink} href={`/decks/${deck.id}`}>
                <ChakraCard>
                    <CardHeader>
                        <Flex
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Editable
                                as={Heading}
                                defaultValue={
                                    deck.name || "Click to rename deck"
                                }
                                onChange={debounce(updateName, 250)}
                                onClick={(event) => event.preventDefault()}
                            >
                                <EditableInput />
                                <EditablePreview />
                            </Editable>
                            <Popover>
                                <PopoverTrigger>
                                    <IconButton
                                        variant="ghost"
                                        colorScheme="gray"
                                        aria-label="See menu"
                                        icon={<BsThreeDotsVertical />}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.nativeEvent.stopImmediatePropagation();
                                        }}
                                    />
                                </PopoverTrigger>
                                <PopoverContent>
                                    <Button
                                        colorScheme="red"
                                        onClick={deleteDeck}
                                    >
                                        Delete
                                    </Button>
                                </PopoverContent>
                            </Popover>
                        </Flex>
                    </CardHeader>
                    <CardBody>{deck.cards[0].count}</CardBody>
                </ChakraCard>
            </Link>
        </motion.div>
    );
}
