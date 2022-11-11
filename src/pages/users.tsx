import { GetServerSideProps } from 'next';
import Head from 'next/head';
import fetcher from '../utils/fetcher';

const Users = () => {
  return (
    <div className="max-w-[80%] w-[80%] lg:max-w-[60%] m-auto">
      <Head>
        <title>Users</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="text-lg text-white font-bold">Users</div>
    </div>
  );
};

export default Users;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetcher(`/api/v1/user`, context.req.headers);
  return { props: { userData: data } };
};
