import Link from 'next/link';
import { Database } from '../types/supabase';

type Profile = Database['public']['Tables']['profiles']['Row'];

type PropsType = {
  users: Profile[]
}

export default function UsersList({ users } : PropsType) {
  return (
    <div className='flex flex-col w-full mr-10 pt-8 md:w-full lg:w-4/12 mx-auto md:mx-0 h-screen'>
      <div className='h-20 pb-2'>

      </div>
      <div className='bg-white p-10 flex flex-col w-full shadow-xl rounded-xl h-4/5 mt-10'>
        <h2 className='text-2xl font-bold text-gray-800 text-left mb-5'>
          People you can talk with
        </h2>
        <div className='w-full'>
          {users.map((user) => (
            <div
              id='button'
              className='flex flex-col w-full my-5'
              key={user.id}
            >
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
                  <div className='font-bold'>
                    <Link href={`/messages/${user.id}`}>
                    {user.full_name || user.username || user.id}
                    </Link>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
