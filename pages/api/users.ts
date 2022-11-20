import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { Database } from '../../types/supabase';

export default async function hundler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const supabaseClient = createServerSupabaseClient<Database>({ req, res });
      const { data: users, error } = await supabaseClient.from("profiles").select("*");

      if (error) {
        throw Error(error.message);
      }

      return res.status(200).json({ users });
    }
    else {
      return res.status(400).json({ error: 'METHOD NOT ALLOWED' });
    }
  } catch (error) {
    console.error("failed to fetch users", error);
    res.status(500).json({ error: 'failed to fetch users'});
  }
}
