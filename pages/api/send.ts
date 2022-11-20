import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Database } from '../../types/supabase'
import { imagine } from '../../utils/openai';

interface MessageApiRequest extends NextApiRequest {
  body: string;
}

type Response = {
  message: string;
}

export default async function handler(req: MessageApiRequest, res: NextApiResponse<Response>) {
  if (req.method === 'POST') {
    const supabaseClient = createServerSupabaseClient<Database>({ req, res });
    const { data } = await supabaseClient.auth.getUser();
    const { message, destination } = JSON.parse(req.body);

    if (!data) {
      return res.status(401);
    }

    if (!message || !message.length || destination) {
      console.debug(message)
      return res.status(500).json({ message: "invalid message "});
    }

    const imaginedMessage = message;

    if (!imaginedMessage) {
      return res.status(500).json({ message: "failed to imagine message "});
    }

    const { error, status } = await supabaseClient.from('messages').insert({
      author: data.user?.id,
      content: imaginedMessage,
      destination
    });

    if (error) {
      return res.status(status).json({ message: error.message });
    }

    res.status(200);
  }
}
