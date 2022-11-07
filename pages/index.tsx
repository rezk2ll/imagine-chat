import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import MessageInput from '../components/message-input';
import MessageList from '../components/message-list';
import UsersList from '../components/users-list';

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <body className='antialiased bg-gradient-to-br from-slate-100 to-white w-full h-full'>
      <div className='px-8 mx-8'>
        <div className='flex flex-col text-center md:text-left md:flex-row h-screen justify-evenly md:items-center'>
          {!session ? (
            <Auth supabaseClient={supabase} />
          ) : (
            <>
              <MessageList />
              <UsersList />
            </>
          )}
        </div>
      </div>
    </body>
  );
};

export default Home;
