import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Heading,
} from "@chakra-ui/react";
import { Card as CardType } from "@/utils/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useCallback, useState } from "react";

export default function RecallCard({ card }: { card: CardType }) {
    const [flip, setFlip] = useState(false);
    const supabase = useSupabaseClient();
    const deleteCard = useCallback(async () => {
        await supabase.from("cards").delete().eq("id", card.id);
    }, []);

    return (
        <Card minHeight={250} align="center">
            <CardHeader>
                <Heading>Card with ID: {card.id}</Heading>
            </CardHeader>
            <CardBody>
                {flip ? card.backside_content : card.frontside_content}
            </CardBody>
            <CardFooter>
                <Button onClick={() => setFlip(!flip)}>Flip!</Button>
            </CardFooter>
        </Card>
    );
}
