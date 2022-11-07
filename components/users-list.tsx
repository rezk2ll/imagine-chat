import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import { Database } from '../types/supabase';

type Profile = Database['public']['Tables']['profiles']['Row'];

export default function UsersList() {
  const supabase = useSupabaseClient<Database>();
  const [users, setUsers] = useState<Profile[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const { data, error } = await supabase.from('profiles').select('*');

    if (error) {
      return;
    }

    if (data) {
      setUsers(data);
    }
  }

  return (
    <div className='w-full md:w-full lg:w-6/12 mx-auto md:mx-0'>
      <div className='bg-white p-10 flex flex-col w-full shadow-xl rounded-xl'>
        <h2 className='text-2xl font-bold text-gray-800 text-left mb-5'>
          People you can talk with
        </h2>
        <div className='w-full'>
          {users.map(user => (
            <div id='button' className='flex flex-col w-full my-5' key={user.id}>
              <button
                type='button'
                className='w-full py-4 bg-green-600 rounded-lg text-green-100'
              >
                <div className='flex flex-row items-center justify-center'>
                  <div className='mr-2'>
                    <svg
                      className='w-6 h-6'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'
                      ></path>
                    </svg>
                  </div>
                  <div className='font-bold'>{ user.full_name || user.username || user.id }</div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
