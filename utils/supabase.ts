import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";

export async function createRequestClient(context: GetServerSidePropsContext) {
    const client = await createServerSupabaseClient(context);
    const {
        data: { session },
    } = await client.auth.getSession();

    return { session, client };
}

export async function getProfile() {}

export async function updateProfile() {}

export async function uploadImage() {}

export async function downloadImage() {}

export async function createDeck() {}

export async function deleteDeck() {}

export async function createCard() {}

export async function deleteCard() {}
