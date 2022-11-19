import { GetServerSideProps } from 'next';
import MyHead from '../components/MyHead';
import { BaseResponse } from '../models/baseResponse.model';
import fetcher from '../utils/fetcher';

const Dashboard = () => {
  return (
    <div className="md:max-w-[80%] w-[100%] lg:max-w-[60%] m-auto">
      <MyHead title="Dashbaord" />
      <div className="text-lg text-white font-bold">Dashbaord</div>
      {/* <RichTextEditor /> */}
    </div>
  );
};

export default Dashboard;
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
