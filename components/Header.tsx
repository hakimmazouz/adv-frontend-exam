import { Box, Button, Card, Container, Flex, Heading } from "@chakra-ui/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

export default function Header() {
    const supabase = useSupabaseClient();
    const user = useUser();
    const router = useRouter();
    const handleSignOut = useCallback(async () => {
        await supabase.auth.signOut();
        router.push("/login");
    }, []);
    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_OUT") {
                // delete cookies on sign out
                const expires = new Date(0).toUTCString();
                document.cookie = `my-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
                document.cookie = `my-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
            } else if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
                const maxAge = 100 * 365 * 24 * 60 * 60; // 100 years, never expires
                document.cookie = `my-access-token=${session?.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
                document.cookie = `my-refresh-token=${session?.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
            }
        });
    }, [supabase]);
    return (
        <Box as="header" pos="fixed" w="full">
            <Container maxWidth={1000} py="4">
                <Card variant="filled" px="4" py="4">
                    <Flex
                        justifyContent="space-between"
                        alignItems="center"
                        w="full"
                    >
                        <Heading size="lg">Anki</Heading>
                        {user && (
                            <Button
                                variant="solid"
                                colorScheme="blackAlpha"
                                onClick={handleSignOut}
                            >
                                Sign out
                            </Button>
                        )}
                    </Flex>
                </Card>
            </Container>
        </Box>
    );
}
