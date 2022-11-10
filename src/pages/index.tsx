import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { CurrentUserLogin } from '../models/user.model';
import fetcher from '../utils/fetcher';

const Home: NextPage<{ fallbackData: CurrentUserLogin }> = ({
  fallbackData,
}) => (
  <div className="max-w-[80%] w-[80%] lg:max-w-[60%] m-auto">
    <Head>
      <title>Happy Quizy Admin</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <p>Hello My name is Happy Quiz</p>
    <div>{JSON.stringify(fallbackData, null, 2)}</div>
  </div>
);

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetcher(`/api/v1/user`, context.req.headers);
  return { props: { fallbackData: data } };
};
