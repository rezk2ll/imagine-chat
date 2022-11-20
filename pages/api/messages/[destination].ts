import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { Database } from '../../../types/supabase';

type Response = {
  messages: Database['public']['Tables']['messages']['Row'][];
};

type ErrorResponse = {
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response | ErrorResponse>
) {
  try {
    const destination = req.query.thread as string;

    if (!destination) {
      throw Error('invalid request');
    }

    const supabaseClient = createServerSupabaseClient<Database>({ req, res });
    const { data: connectedUser } = await supabaseClient.auth.getUser();

    if (!connectedUser) {
      return res.status(401);
    }

    const currentUser = connectedUser.user?.id;

    const { data: messages, error } = await supabaseClient
      .from('messages')
      .select()
      .filter('author', 'in', `("${currentUser}", "${destination}")`)
      .filter('destination', 'in', `("${currentUser}", "${destination}")`);

    if (error) {
      throw Error(error.message);
    }

    res.status(200).json({ messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'failed to fetch messages' });
  }
}
