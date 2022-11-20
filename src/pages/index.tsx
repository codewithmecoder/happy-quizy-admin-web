import { GetServerSideProps, NextPage } from 'next';
import MyHead from '../components/MyHead';
import { BaseResponse } from '../models/baseResponse.model';
import { CurrentUserLogin } from '../models/user.model';
import fetcher from '../utils/fetcher';

const Home: NextPage<{
  userData: CurrentUserLogin;
  context: any;
}> = ({ userData }) => {
  return (
    <div className="md:max-w-[80%] w-[100%] lg:max-w-[60%] m-auto">
      <MyHead title="Happy Quizy Admin" />
      <p>Hello My name is Happy Quiz</p>
      <div>{JSON.stringify(userData, null, 2)}</div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetcher<BaseResponse<object>>(
    `/api/v1/user`,
    context.req.headers
  );
  if (!data?.success) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return { props: { userData: data } };
};
