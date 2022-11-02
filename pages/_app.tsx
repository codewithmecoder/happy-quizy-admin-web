import type { AppProps } from 'next/app';
import Link from 'next/link';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-zinc-800 min-h-screen min-w-full">
      <div className="m-auto max-w-[80%] bg-neutral-800 w-[80%] max-h-14 h-14 rounded-md flex items-center justify-between px-2">
        <div>
          <p className="text-gray-400 hover:text-white">
            <Link href="/">Happy Quiz</Link>
          </p>
        </div>
        <div className="flex gap-10">
          <p className="text-gray-400 hover:text-white">
            <Link href="/dashboard">Dashboard</Link>
          </p>
          <p className="text-gray-400 hover:text-white">
            <Link href="/quiz">Quiz</Link>
          </p>
          <p className="text-gray-400 hover:text-white">
            <Link href="/users">Users</Link>
          </p>
          <p className="text-gray-400 hover:text-white">
            <Link href="/login">Login/Logout</Link>
          </p>
        </div>
      </div>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
