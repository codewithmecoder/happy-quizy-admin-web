import { GetServerSideProps } from 'next';
import Head from 'next/head';
import fetcher from '../utils/fetcher';

const Dashboard = () => {
  return (
    <div className="max-w-[80%] w-[80%] lg:max-w-[60%] m-auto">
      <Head>
        <title>Dashbaord</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="text-lg text-white font-bold">Dashbaord</div>
    </div>
  );
};

export default Dashboard;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetcher(`/api/v1/user`, context.req.headers);
  return { props: { userData: data } };
};
