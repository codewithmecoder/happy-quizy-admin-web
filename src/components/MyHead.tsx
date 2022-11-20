import Head from 'next/head';

interface Props {
  title: string;
}

const MyHead = ({ title }: Props) => {
  return (
    <Head>
      <meta
        http-equiv="Content-Security-Policy"
        content="upgrade-insecure-requests"
      ></meta>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default MyHead;
