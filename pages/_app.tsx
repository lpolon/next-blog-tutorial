import { AppProps } from 'next/app';
import '../global.css';

// This App component is the top-level component which will be common across all the different pages. You can use this App component to keep state when navigating between pages, for example.

// global providers
export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
