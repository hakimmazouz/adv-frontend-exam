import { Database } from "@/utils/database.types";
import {
    Session,
    useSupabaseClient,
    useUser,
} from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import Avatar from "./Avatar";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Text,
    useToast,
} from "@chakra-ui/react";

type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

export default function Account({
    session,
    initialData,
}: {
    session: Session;
    initialData: Profiles;
}) {
    const toast = useToast();
    const supabase = useSupabaseClient();
    const [updating, setUpdating] = useState(false);
    const [username, setUsername] = useState<Profiles["username"]>(
        initialData.username
    );
    const [website, setWebsite] = useState<Profiles["website"]>(
        initialData.website
    );
    const [avatar_url, setAvatarUrl] = useState<Profiles["avatar_url"]>(
        initialData.avatar_url
    );

    async function updateProfile({
        username,
        website,
        avatar_url,
    }: {
        username: Profiles["username"];
        website: Profiles["website"];
        avatar_url: Profiles["avatar_url"];
    }) {
        setUpdating(true);
        try {
            const updates = {
                id: session.user.id,
                username,
                website,
                avatar_url,
                updated_at: new Date().toISOString(),
            };
            const { error } = await supabase.from("profiles").upsert(updates);
            if (error) throw error;
            toast({
                title: "Profile updated.",
                description: "We've updated your profile for you.",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        } catch (e) {
            toast({
                title: "Update failed.",
                description:
                    "We couldn't update your profile due to an error. Try again.",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        } finally {
            setUpdating(false);
        }
    }

    return (
        <Stack spacing={4} className="form-widget">
            <FormControl>
                <FormLabel mb="8px">Username</FormLabel>
                <Input
                    value={username || ""}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Insert a username"
                />
            </FormControl>
            <FormControl>
                <FormLabel mb="8px">Website</FormLabel>
                <Input
                    value={website || ""}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://google.com"
                />
            </FormControl>

            <div>
                <Button
                    colorScheme="messenger"
                    className="button primary block"
                    onClick={() =>
                        updateProfile({ username, website, avatar_url })
                    }
                >
                    {updating ? "Updating ..." : "Update"}
                </Button>
            </div>
            <div>
                <Avatar
                    uid={session.user.id}
                    url={avatar_url}
                    size={150}
                    onUpload={(url) => {
                        setAvatarUrl(url);
                        updateProfile({ username, website, avatar_url: url });
                    }}
                />
            </div>
            <div>
                <Button
                    className="button block"
                    onClick={() => supabase.auth.signOut()}
                >
                    Sign Out
                </Button>
            </div>
        </Stack>
    );
}
