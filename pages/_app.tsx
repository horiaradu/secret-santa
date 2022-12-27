import '../styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="h-screen bg-white dark:bg-slate-800 dark:text-white">
      <Component {...pageProps} />
    </div>
  );
}
