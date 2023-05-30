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
} from "@chakra-ui/react";
import { Card as CardType } from "@/utils/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useCallback, useState } from "react";
import { BsArrowRepeat } from "react-icons/bs";
import { debounce } from "lodash";

export default function RecallCard({ card }: { card: CardType }) {
    const [flip, setFlip] = useState(false);
    const supabase = useSupabaseClient();
    const deleteCard = useCallback(async () => {
        await supabase.from("cards").delete().eq("id", card.id);
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
        <Card minHeight={250} align="center">
            <CardHeader>
                {/* <Heading>Card with ID: {card.id}</Heading> */}
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
