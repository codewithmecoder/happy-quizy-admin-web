import { GetServerSideProps } from 'next';
import MyHead from '../components/MyHead';
import { BaseResponse } from '../models/baseResponse.model';
import fetcher from '../utils/fetcher';

const Users = () => {
  return (
    <div className="md:max-w-[80%] w-[100%] lg:max-w-[60%] m-auto">
      <MyHead title="Happy Quizy - Users" />
      <div className="text-lg text-white font-bold">Users</div>
    </div>
  );
};

export default Users;
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
  return { props: { userData: data } };
};
