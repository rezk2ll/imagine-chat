
import UsersList from '../components/users-list';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';

export async function getUsers() {
  const response = await fetch(`${process.env.API_URL}/api/users`);
  return response.json();
}

export default async function Page() {
  // const session = useSession();
  // const supabase = useSupabaseClient();

  const data = await getUsers();
  return (
     <UsersList users={data.users}/>
    // <>
    //   {!session ? (
    //     <Auth supabaseClient={supabase} />
    //   ) : (
    //     <>
    //       <UsersList />
    //     </>
    //   )}
    // </>
  );
}
