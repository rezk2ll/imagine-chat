import '../styles/globals.css';
import SupaBaseContext from '../context/supabase';

type PropsType = {
  children: React.ReactElement;
};

export default function Layout({ children }: PropsType) {
  return (
    <html lang='en'>
      {}
      <head />
      <body className='antialiased bg-gradient-to-br from-slate-100 to-white w-full h-full'>
        <div className='px-8 mx-8'>
          <div className='flex flex-col text-center md:text-left md:flex-row h-screen justify-evenly md:items-center'>
            <SupaBaseContext>{children}</SupaBaseContext>
          </div>
        </div>
      </body>
    </html>
  );
}
