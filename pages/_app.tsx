import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import NProgress from 'nprogress';
import { useRouter } from 'next/router';

NProgress.configure({ showSpinner: false });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      NProgress.start();
    });
    router.events.on('routeChangeComplete', () => {
      NProgress.done();
    });
    router.events.on('routeChangeError', () => {
      NProgress.done();
    });
  }, [router]);

  return (
    <div className="h-screen bg-white dark:bg-slate-800 dark:text-white">
      <Component {...pageProps} />
    </div>
  );
}
