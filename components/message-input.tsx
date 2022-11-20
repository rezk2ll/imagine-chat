'use client';

import React, { ChangeEvent, useState } from 'react';

export default function MessageInput() {
  const [message, setMessage] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSend = async () => {
    try {
      console.debug("sending");
      const response = await fetch('/api/send', {
        method: 'POST',
        body: JSON.stringify({
          message: message,
        }),
      });

      if (response.status === 200) {
        setMessage('');
      }
    } catch (error) {
      console.debug(error);
    }
  };

  return (
    <div className='flex flex-row items-center w-full'>
      <label htmlFor='send' className='sr-only'>
        Send message { message }
      </label>
      <div className='relative w-full flex'>
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
          id='send'
          placeholder='something, something to imagine...'
          required={true}
          value={message}
          onChange={handleChange}
          className='w-full appearance-none border-2 border-gray-100 rounded-lg px-4 pl-8 mx-3 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg'
        />
      </div>
      <button
        type='submit'
        className='py-4 bg-green-600 rounded-lg text-green-100 w-24'
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
}
