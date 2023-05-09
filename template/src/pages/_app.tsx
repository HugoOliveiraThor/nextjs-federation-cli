import type { AppProps } from 'next/app';
import { Roboto } from '@next/font/google';
import '@/styles/global.css';
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['italic', 'normal'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={roboto.className}>
      <Component {...pageProps} />
    </main>
  );
}
