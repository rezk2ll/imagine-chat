import React, { ChangeEvent, useState } from 'react';

export default function MessageInput() {
  const [message, setMessage] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSend = async () => {
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        body: JSON.stringify({
          message: message,
        }),
      });

      if(response.status === 200) { 
        setMessage('');
      }
    } catch (error) {
      console.debug(error);
    }
  };

  return (
    <div
      style={{
        maxWidth: '700px',
        margin: '100px auto',
      }}
    >
      <div className='flex items-center'>
        <label htmlFor='voice-search' className='sr-only'>
          Send message
        </label>
        <div className='relative w-full'>
          <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-send'
              viewBox='0 0 16 16'
            >
              <path d='M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z' />
            </svg>
          </div>
          <input
            type='text'
            id='main send'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='something, something to imagine...'
            required={true}
            value={message}
            onChange={handleChange}
          />
        </div>
        <button
          type='submit'
          className='inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}
