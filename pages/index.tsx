import { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => (
  <div className="max-w-[80%] w-[80%] m-auto">
    <Head>
      <title>Happy Quizy Admin</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <p>Hello My name is Happy Quiz</p>
  </div>
);

export default Home;
