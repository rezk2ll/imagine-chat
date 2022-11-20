'use client';

import { useState } from 'react';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { AuthApiError } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import AuthForm from './form';

import type { AuthEvent } from './form';

export default function EmailSignin() {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();

  const [error, setError] = useState('');

  const handleLogin = async (event: AuthEvent) => {
    event.preventDefault();

    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error === null) {
      router.replace('/');
    } else {
      if (error instanceof AuthApiError) {
        setError('Incorrect email or password');
      }
    }
  };

  return (
    <AuthForm
      onSubmit={handleLogin}
      submitLabel='Login'
      error={error}
      resetError={() => setError('')}
    />
  );
}
