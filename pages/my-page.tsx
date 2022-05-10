import Head from 'next/head';
import Script from 'next/script';
import Layout from '../components/layout';

export default function MyPage() {
  return (
    <>
      <Head>
        <title>My page!</title>
      </Head>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() => {
          console.log('lalalala');
        }}
      />
      <Layout>
        <div>lalalalalala</div>
      </Layout>
    </>
  );
}
