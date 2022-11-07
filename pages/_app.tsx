import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps<{ initialSesion: Session }>) {
  const [supaBaseClient] = useState(() => createBrowserSupabaseClient());
  return (
    <SessionContextProvider
      supabaseClient={supaBaseClient}
      initialSession={pageProps.initialSesion}
    >
      <Component {...pageProps} />
    </SessionContextProvider>
  );
}
