import { useMutation, useQuery } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ChangeEvent, FormEvent, useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { BsBackspace, BsTrash } from 'react-icons/bs';
import Moment from 'react-moment';
import InputForm from '../components/InputForm';
import Loading from '../components/Loading';
import PrimaryButton from '../components/PrimaryButton';
import { TypeQuestionModel } from '../models/typeQuestion.model';
import {
  createTypeQuestion,
  fetchTypeQuestions,
} from '../services/typeQuestion.service';
import { Constants } from '../utils/constants';
import fetcher from '../utils/fetcher';

const TypeQuestion = () => {
  const [typeQuestionValues, setTypeQuestionValues] = useState({
    type: '',
  });
  const mutation = useMutation(createTypeQuestion, {
    onSuccess: () => {
      setTypeQuestionValues({ ...typeQuestionValues, type: '' });
      refetch();
    },
  });
  const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTypeQuestionValues({
      ...typeQuestionValues,
      [e.target.name]: e.target.value,
    });
  };
  const submitHadler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(typeQuestionValues as any);
  };
  const { data, isError, isLoading, isSuccess, refetch } = useQuery(
    [Constants.queries.typeQuestion],
    fetchTypeQuestions
  );
  return (
    <div className="max-w-[80%] w-[80%] lg:max-w-[60%] m-auto px-5">
      <Head>
        <title>Quiz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="/quiz">
        <div className="bg-blue-500 py-1 px-2 rounded-md w-20 flex items-center justify-center gap-2">
          <p className="text-white">Back</p>
          <BsBackspace className="text-white" />
        </div>
      </Link>
      <form
        onSubmit={submitHadler}
        action=""
        className="w-[100%] lg:w-[60%] h-[60%] bg-neutral-800 items-start justify-start flex flex-col p-5 gap-4 m-auto"
      >
        <InputForm
          label="Name Type Question"
          name="type"
          onChange={onchangeHandler}
          // errorMessage="Name Type Question should be 3-16 characters and shouldn't include any special character!"
          // pattern="^[A-Za-z0-9]{3,16}$"
          // required={true}
          value={typeQuestionValues.type}
        />
        <div className="flex items-center justify-center w-full mt-5">
          <PrimaryButton
            type="submit"
            text="Add Type Question"
            isLoading={mutation.isLoading}
          />
        </div>
      </form>
      <fieldset className="flex items-center justify-center text-white border p-3 rounded w-[100%]">
        <legend>List Of Type Questions</legend>
        {isError && <p>Error fetching data</p>}
        {isLoading && <Loading size="medium" />}
        {isSuccess && (
          <table className="table-auto w-[90%] text-left">
            <thead>
              <tr>
                <th>Type Questions</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.success ? (
                (data.data as TypeQuestionModel[])?.map((typeQ) => (
                  <tr key={typeQ.id}>
                    <td>{typeQ.type}</td>
                    <td>
                      <Moment format="DD-MM-YYYY">{typeQ.createdAt}</Moment>
                    </td>
                    <td className="flex">
                      <BsTrash
                        onClick={() =>
                          console.log(`Delete Type Question ID: ${typeQ.id}`)
                        }
                        className="w-7 h-7 text-red-600 cursor-pointer"
                      />
                      <BiEdit
                        onClick={() =>
                          console.log(`Delete Type Question ID: ${typeQ.id}`)
                        }
                        className="w-7 h-7 text-yellow-500 cursor-pointer"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <p>rgsdg</p>
              )}
            </tbody>
          </table>
        )}
      </fieldset>
    </div>
  );
};

export default TypeQuestion;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetcher(`/api/v1/user`, context.req.headers);
  return { props: { userData: data } };
};
