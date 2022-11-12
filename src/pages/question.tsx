import { GetServerSideProps } from 'next';
import BackButton from '../components/BackButton';
import MyHead from '../components/MyHead';
import fetcher from '../utils/fetcher';

const Question = () => {
  return (
    <div className="md:max-w-[80%] w-[100%] lg:max-w-[60%] m-auto p-5">
      <MyHead title="Happy Quizy - Question" />
      <BackButton href="/quiz" />
      <div className="flex flex-col md:flex-row items-center justify-center gap-5"></div>
    </div>
  );
};

export default Question;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetcher(`/api/v1/user`, context.req.headers);
  return { props: { userData: data } };
};
