import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { ChangeEvent, FormEvent, useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { BsFillArrowDownCircleFill, BsTrash } from 'react-icons/bs';
import Moment from 'react-moment';
import BackButton from '../components/BackButton';
import InputForm from '../components/InputForm';
import Loading from '../components/Loading';
import Modal from '../components/Modal';
import MyHead from '../components/MyHead';
import PrimaryButton from '../components/PrimaryButton';
import { CreateQuestionModel, QuestionModel } from '../models/question.model';
import { TypeQuestionModel } from '../models/typeQuestion.model';
import {
  createQuestion,
  getQuestionByTypeQuestion,
} from '../services/question.service';
import { fetchOnlyTypeQuestions } from '../services/typeQuestion.service';
import { Constants } from '../utils/constants';
import fetcher from '../utils/fetcher';

interface TypeQuestionError {
  content: string | null;
  typeQuestion: string | null;
}

const initialTpyeQuestion: TypeQuestionModel = {
  id: 0,
  type: '',
  photo: null,
  questions: [],
};
const initialQuestion: CreateQuestionModel = {
  content: null,
  typeQuestionId: 0,
};
const Question = () => {
  const [typeQuestionModal, setTypeQuestionModal] = useState(false);
  const [updateId, setUpdateId] = useState<number>(0);
  const [typeQuestion, setTypeQuestion] =
    useState<TypeQuestionModel>(initialTpyeQuestion);
  const [questionValues, setQuestionValues] =
    useState<CreateQuestionModel>(initialQuestion);
  const [errorObject, setErrorObject] = useState<TypeQuestionError>({
    content: null,
    typeQuestion: null,
  });
  const [error, setError] = useState<string | null>(null);
  const mutation = useMutation(createQuestion, {
    onSuccess: () => {
      setQuestionValues(initialQuestion);
      setTypeQuestion(initialTpyeQuestion);
      setError(null);
    },
    onError: (e: AxiosError) => {
      setError(e.message);
    },
  });
  const validate = (value: CreateQuestionModel) => {
    const error: TypeQuestionError = {
      content: null,
      typeQuestion: null,
    };
    if (!value.content) error.content = 'Name Question cannot be empty!';
    if (value.typeQuestionId <= 0) error.typeQuestion = 'Please type question!';
    return error;
  };
  const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestionValues({ ...questionValues, [e.target.name]: e.target.value });
  };
  const submitHadler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    questionValues.typeQuestionId = typeQuestion.id;
    setErrorObject(validate(questionValues));
    if (errorObject.content || errorObject.typeQuestion) return;
    const { content, typeQuestionId } = questionValues;
    mutation.mutate({ content, typeQuestionId } as any);
  };

  const tqQuery = useQuery(
    [Constants.queries.onlyTypeQuestion],
    fetchOnlyTypeQuestions
  );
  const qQuery = getQuestionByTypeQuestion(1);
  return (
    <div className="md:max-w-[80%] w-[100%] lg:max-w-[60%] m-auto p-5">
      <MyHead title="Happy Quizy - Question" />
      <BackButton href="/quiz" />
      <form
        onSubmit={submitHadler}
        action=""
        className="w-[100%] lg:w-[60%] h-[60%] bg-neutral-800 items-start justify-start flex flex-col pt-5 gap-4 m-auto"
      >
        <InputForm
          label="Name Question"
          name="content"
          onChange={onchangeHandler}
          value={questionValues.content ?? ''}
        />
        <span className="text-red-500">
          {errorObject.content && <li>{errorObject.content}</li>}
        </span>
        <InputForm
          label="Type Question"
          name="typeQuestionId"
          readonly={true}
          className="cursor-pointer"
          onClick={() => {
            if (!tqQuery.data) tqQuery.refetch();
            setTypeQuestionModal(true);
          }}
          value={typeQuestion.type ?? ''}
        />
        <span className="text-red-500">
          {errorObject.typeQuestion && <li>{errorObject.typeQuestion}</li>}
        </span>
        <span className="text-red-400">{error}</span>
        <div className="flex items-center justify-center w-full mt-5">
          <PrimaryButton
            type="submit"
            text={updateId > 0 ? 'Update Question' : 'Add Question'}
            isLoading={mutation.isLoading}
          />
        </div>
      </form>
      <fieldset className="flex items-center justify-center text-white border p-3 rounded w-[100%]">
        <legend>List Of Questions</legend>
        {qQuery.isError && <p>Error fetching data</p>}
        {qQuery.isLoading && <Loading size="medium" />}
        {qQuery.isSuccess && (
          <table className="table-auto w-[90%] text-left">
            <thead>
              <tr>
                <th>No</th>
                <th>Type Questions</th>
                <th>Photo</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {qQuery.data?.success ? (
                (qQuery.data.data as QuestionModel[])?.map(
                  (question, index) => (
                    <tr key={question.id}>
                      <td>{index + 1}</td>
                      <td>{question.content}</td>
                      <td>{question.typeQuestion.type}</td>
                      <td>
                        <Moment format="DD-MM-YYYY">
                          {question.createdAt}
                        </Moment>
                      </td>
                      <td>
                        <Moment format="DD-MM-YYYY">
                          {question.updatedAt}
                        </Moment>
                      </td>
                      <td className="flex">
                        <BsTrash
                          onClick={() => {
                            // setShowDeleteModal(true);
                            // setDeleteModalData(typeQ);
                          }}
                          className="w-7 h-7 text-red-600 cursor-pointer"
                        />
                        <BiEdit
                          onClick={() => {
                            // setUpdateId(typeQ.id);
                            // setTypeQuestionValues({
                            //   ...typeQuestionValues,
                            //   type: typeQ.type,
                            //   photo: typeQ.photo,
                            // });
                          }}
                          className="w-7 h-7 text-yellow-500 cursor-pointer"
                        />
                      </td>
                    </tr>
                  )
                )
              ) : (
                <p></p>
              )}
            </tbody>
          </table>
        )}
      </fieldset>
      <Modal
        // key={deleteModalData?.id}
        child={
          <>
            <div className="p-4">
              {tqQuery.isError && <p>Error fetching data</p>}
              {tqQuery.isLoading && <Loading size="medium" />}
              {tqQuery.isSuccess && (
                <table className="table-auto w-[90%] text-left">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Type</th>
                      <th>Photo</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tqQuery.data?.success ? (
                      (tqQuery.data.data as TypeQuestionModel[])?.map(
                        (typeQ, index) => (
                          <tr key={typeQ.id}>
                            <td>{index + 1}</td>
                            <td>{typeQ.type}</td>
                            <td>
                              <div className="w-10 h-10">
                                <Image
                                  src={
                                    typeQ.photo ??
                                    '/assets/images/no_image_available.png'
                                  }
                                  alt={typeQ.type}
                                  className="w-full h-full rounded-full shadow-md"
                                  priority
                                  object-fit="contain"
                                  width={50}
                                  height={50}
                                />
                              </div>
                            </td>
                            <td className="flex">
                              <BsFillArrowDownCircleFill
                                onClick={() => {
                                  setTypeQuestion(typeQ);
                                  setTypeQuestionModal(false);
                                }}
                                className="w-7 h-7 text-red-600 cursor-pointer"
                              />
                            </td>
                          </tr>
                        )
                      )
                    ) : (
                      <p></p>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </>
        }
        visible={typeQuestionModal}
        onClose={() => setTypeQuestionModal(false)}
        height="70%"
        width="80%"
      />
    </div>
  );
};

export default Question;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetcher(`/api/v1/user`, context.req.headers);
  return { props: { userData: data } };
};