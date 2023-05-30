import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Editable,
    EditableInput,
    EditablePreview,
    Heading,
    Icon,
    IconButton,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@chakra-ui/react";
import { Card as CardType } from "@/utils/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useCallback, useState } from "react";
import { BsArrowRepeat, BsThreeDotsVertical } from "react-icons/bs";
import { debounce } from "lodash";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function RecallCard({ card }: { card: CardType }) {
    const [flip, setFlip] = useState(false);
    const supabase = useSupabaseClient();
    const router = useRouter();
    const deleteCard = useCallback(async () => {
        await supabase.from("cards").delete().eq("id", card.id);
        router.replace(router.asPath);
    }, []);
    const updateFrontside = useCallback(async (value: string) => {
        const { error } = await supabase
            .from("cards")
            .update({ frontside_content: value })
            .eq("id", card.id);
    }, []);
    const updateBackside = useCallback(async (value: string) => {
        const { error } = await supabase
            .from("cards")
            .update({ backside_content: value })
            .eq("id", card.id);
    }, []);

    return (
        <Card
            layout
            exit={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            as={motion.div}
            minHeight={250}
            align="center"
        >
            <CardHeader>
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
                        <Button colorScheme="red" onClick={deleteCard}>
                            Delete
                        </Button>
                    </PopoverContent>
                </Popover>
            </CardHeader>
            <CardBody>
                {flip ? (
                    <Editable
                        key="backside"
                        as={Heading}
                        onChange={debounce(updateBackside, 250)}
                        size={
                            card.frontside_content &&
                            card.frontside_content?.length > 15
                                ? "sm"
                                : "lg"
                        }
                        defaultValue={card.backside_content || "Empty front"}
                    >
                        <EditablePreview />
                        <EditableInput textAlign="center" />
                    </Editable>
                ) : (
                    <Editable
                        key="frontside"
                        as={Heading}
                        size={
                            card.frontside_content &&
                            card.frontside_content?.length > 15
                                ? "sm"
                                : "lg"
                        }
                        onChange={debounce(updateFrontside, 250)}
                        defaultValue={card.frontside_content || "Empty back"}
                    >
                        <EditablePreview />
                        <EditableInput textAlign="center" />
                    </Editable>
                )}
            </CardBody>
            <CardFooter>
                <Button onClick={() => setFlip(!flip)}>
                    <Icon as={BsArrowRepeat} />
                </Button>
            </CardFooter>
        </Card>
    );
}
