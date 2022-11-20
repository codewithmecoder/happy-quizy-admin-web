import { GetServerSideProps, NextPage } from 'next';
import MyHead from '../components/MyHead';
import { BaseResponse } from '../models/baseResponse.model';
import { CurrentUserLogin } from '../models/user.model';
import fetcher from '../utils/fetcher';

const Home: NextPage<{
  userData: CurrentUserLogin;
  headers: Partial<{
    [key: string]: string;
  }>;
}> = ({ userData, headers }) => {
  return (
    <div className="md:max-w-[80%] w-[100%] lg:max-w-[60%] m-auto">
      <MyHead title="Happy Quizy Admin" />
      <p>Hello My name is Happy Quiz</p>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
      <br />
      <pre>{JSON.stringify(headers, undefined, 2)}</pre>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetcher<BaseResponse<object>>(`/api/v1/user`, {
    cookie: context.req.headers.cookie,
  });
  if (!data?.success) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: { userData: data, headers: context.req.cookies },
  };
};
