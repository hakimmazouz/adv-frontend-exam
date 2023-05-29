import { createRequestClient } from "@/utils/supabase";
import { GetServerSidePropsContext, NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
    const context = { req, res } as unknown as GetServerSidePropsContext;
    const { client } = await createRequestClient(context);

    await client.auth.signOut;
};

export default handler;
