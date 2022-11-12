import { useQuery } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Router from 'next/router';
import Loading from '../components/Loading';
import MyHead from '../components/MyHead';
import PrimaryButton from '../components/PrimaryButton';
import { TypeQuestionModel } from '../models/typeQuestion.model';
import { fetchTypeQuestions } from '../services/typeQuestion.service';
import { Constants } from '../utils/constants';
import fetcher from '../utils/fetcher';

const Quiz = () => {
  const { data, isError, isLoading, isSuccess } = useQuery(
    [Constants.queries.typeQuestion],
    fetchTypeQuestions
  );
  return (
    <div className="max-w-[80%] w-[80%] lg:max-w-[60%] m-auto p-5">
      <MyHead title="Happy Quizy - Quiz" />
      <div className="flex flex-col md:flex-row items-center justify-center gap-5">
        <PrimaryButton
          text="Type Questions"
          type="button"
          onClick={() => Router.push('/typequestion')}
        />
        <PrimaryButton text="Questions" type="button" />
        <PrimaryButton text="Answer Questions" type="button" />
      </div>
      <div className="py-10">
        {isError && <p>Error fetching data</p>}
        {isLoading && <Loading size="large" />}
        {isSuccess && (
          <>
            {(data?.data as TypeQuestionModel[]).map((value, index) => (
              <div key={`${index}-${value.id}`}>
                <div className="flex items-center px-10 py-2 cursor-pointer space-x-5">
                  <div className="w-10 h-10">
                    <Image
                      src={
                        value.photo ?? '/assets/images/no_image_available.png'
                      }
                      alt={value.type}
                      className="w-full h-full rounded-full shadow-md"
                      priority
                      object-fit="contain"
                      width={50}
                      height={50}
                    />
                  </div>
                  <h2 className="text-gray-200 font-bold tracking-[0.12em] hover:text-white">
                    {value.type}
                  </h2>
                </div>
                {value.questions.map((question, qindex) => (
                  <div key={`${qindex}-${question.id}`} className=" pl-20">
                    <details className="open:bg-neutral-800 duration-300">
                      <summary className="px-5 py-3 text-lg cursor-pointer text-white">
                        <span className="tracking-[0.05em] pr-2 text-lime-300">
                          Question :
                        </span>
                        <span className="font-bold tracking-[0.05em]">
                          {question.content}
                        </span>
                      </summary>
                      <div className="bg-neutral-800 pl-10 text-white w-full">
                        <p className="text-white">
                          Color <span className="text-green-500">Green</span> is
                          the correct asnwer{' '}
                        </p>
                        {question.answerQuestions.map((answer, aindex) => (
                          <div
                            key={`${answer.id}-${aindex}`}
                            className={`flex items-center space-x-8 mb-2 p-2 ${
                              answer.iscorrect ? 'bg-green-800' : 'bg-gray-600'
                            } text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0  transition duration-150 ease-in-out`}
                          >
                            <h1>{aindex + 1}.</h1>
                            <p className="break-words">{answer.answer}</p>
                          </div>
                        ))}
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            ))}
          </>
        )}
        <pre className="text-white whitespace-pre-wrap">
          {JSON.stringify(data?.data, undefined, 2)}
        </pre>
      </div>
    </div>
  );
};

export default Quiz;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetcher(`/api/v1/user`, context.req.headers);
  return { props: { userData: data } };
};
