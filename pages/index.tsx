import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Auth } from '@supabase/auth-ui-react';
import MessageInput from '../components/message-input';

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div>
      {!session ? (
        <Auth supabaseClient={supabase} />
      ): (
        <MessageInput />
      )}
    </div>
  )
}

export default Home;
