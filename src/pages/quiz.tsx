import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Router from 'next/router';
import PrimaryButton from '../components/PrimaryButton';
import fetcher from '../utils/fetcher';

const Quiz = () => {
  return (
    <div className="max-w-[80%] w-[80%] lg:max-w-[60%] m-auto p-5">
      <Head>
        <title>Quiz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col md:flex-row items-center justify-center gap-5">
        <PrimaryButton
          text="Type Questions"
          type="button"
          onClick={() => Router.push('/typequestion')}
        />
        <PrimaryButton text="Questions" type="button" />
        <PrimaryButton text="Answer Questions" type="button" />
      </div>
    </div>
  );
};

export default Quiz;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetcher(`/api/v1/user`, context.req.headers);
  return { props: { userData: data } };
};
