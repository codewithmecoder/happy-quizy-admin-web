import { GetServerSideProps } from 'next';
import MyHead from '../components/MyHead';
import fetcher from '../utils/fetcher';

const Dashboard = () => {
  return (
    <div className="max-w-[80%] w-[80%] lg:max-w-[60%] m-auto">
      <MyHead title="Dashbaord" />
      <div className="text-lg text-white font-bold">Dashbaord</div>
    </div>
  );
};

export default Dashboard;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetcher(`/api/v1/user`, context.req.headers);
  return { props: { userData: data } };
};
