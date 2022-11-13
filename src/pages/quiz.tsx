import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Router from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import Checkbox from '../components/Checkbox';
import InputForm from '../components/InputForm';
import Loading from '../components/Loading';
import Modal from '../components/Modal';
import MyHead from '../components/MyHead';
import PrimaryButton from '../components/PrimaryButton';
import {
  AnswerQuestionModel,
  ErrorAnswerModel,
} from '../models/answerQuestion.model';
import { BaseResponse } from '../models/baseResponse.model';
import { MessageResponseModel } from '../models/messageResponse.model';
import { QuestionModel } from '../models/question.model';
import { TypeQuestionModel } from '../models/typeQuestion.model';
import { createAnswer } from '../services/asnwerQuestion.service';
import { fetchTypeQuestions } from '../services/typeQuestion.service';
import { Constants } from '../utils/constants';
import fetcher from '../utils/fetcher';

const initQuestionModel: QuestionModel = {
  id: 0,
  content: '',
  answerQuestions: [],
  typeQuestion: {
    id: 0,
    type: '',
    photo: null,
    questions: [],
    createdAt: undefined,
    updatedAt: undefined,
  },
  typeQuestionId: 0,
};
const initCreateAnswerValues: AnswerQuestionModel = {
  id: 0,
  answer: '',
  iscorrect: false,
  questionId: 0,
  typeQuestionId: 0,
};

const initErrorCreateAnswer: ErrorAnswerModel = {
  answer: null,
  question: null,
  typeQuestion: null,
};

const Quiz = () => {
  const [question, setQuestion] = useState<QuestionModel>(initQuestionModel);
  const [createAnswerValues, setCreateAnswerValues] =
    useState<AnswerQuestionModel>(initCreateAnswerValues);
  const [showCreateAnswerModal, setShowCreateAnswerModal] = useState(false);
  const [createAsnwerError, setCreateAsnwerError] = useState<string | null>(
    null
  );
  const [updateId, setUpdateId] = useState<number>(0);
  const { data, isError, isLoading, isSuccess, refetch } = useQuery(
    [Constants.queries.typeQuestion],
    fetchTypeQuestions
  );

  const createAnswerMutation = useMutation(createAnswer, {
    onSuccess: (e) => {
      setCreateAnswerValues(initCreateAnswerValues);
      setCreateAsnwerError(null);
      refetch();
    },
    onError: (e: AxiosError) => {
      if (e.code === 'ERR_NETWORK') {
        setCreateAsnwerError(e.message);
      } else {
        setCreateAsnwerError(
          (e.response?.data as BaseResponse<MessageResponseModel>)?.data.message
        );
      }
    },
  });

  const submitAnswerHadler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createAnswerValues.questionId = question.id;
    createAnswerValues.typeQuestionId = question.typeQuestionId;
    const { answer, iscorrect, questionId, typeQuestionId } =
      createAnswerValues;
    createAnswerMutation.mutate({
      answer,
      iscorrect,
      questionId,
      typeQuestionId,
    } as any);
  };
  const onchangeAnswerHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCreateAnswerValues({
      ...createAnswerValues,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    });
  };

  return (
    <div className="md:max-w-[80%] w-[100%] lg:max-w-[60%] m-auto p-5">
      <MyHead title="Happy Quizy - Quiz" />
      <div className="flex flex-col md:flex-row items-center justify-center gap-5">
        <PrimaryButton
          text="Type Questions"
          type="button"
          onClick={() => Router.push('/typequestion')}
        />
        <PrimaryButton
          text="Questions"
          type="button"
          onClick={() => Router.push('/question')}
        />
        <PrimaryButton
          text="Answer Questions"
          type="button"
          onClick={() => Router.push('/answerquestion')}
        />
      </div>
      <div className="py-10">
        {isError && <p>Error fetching data</p>}
        {isLoading && <Loading size="large" />}
        {isSuccess && (
          <>
            {(data?.data as TypeQuestionModel[])?.map((value, index) => (
              <div key={`${index}-${value.id}`}>
                <div
                  onClick={(e) => {
                    var dev = document.getElementById(
                      `type_question_${value.id}_${index}`
                    );
                    if (dev?.classList.contains('hidden')) {
                      dev.classList.remove('hidden');
                    } else {
                      dev?.classList.add('hidden');
                    }
                  }}
                >
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
                </div>
                <div id={`type_question_${value.id}_${index}`} className="">
                  {value.questions.map((question, qindex) => (
                    <div key={`${qindex}-${question.id}`} className="pl-20">
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
                          {/* <p className="text-white">
                            Color <span className="text-green-500">Green</span>{' '}
                            is the correct asnwer{' '}
                          </p> */}
                          <PrimaryButton
                            text="Add Answer"
                            type="button"
                            onClick={() => {
                              setQuestion(question);
                              setShowCreateAnswerModal(true);
                            }}
                          />
                          {question.answerQuestions.map((answer, aindex) => (
                            <div
                              key={`${answer.id}-${aindex}`}
                              className={`flex justify-between items-center mt-2 space-x-8 mb-2 p-2 ${
                                answer.iscorrect
                                  ? 'bg-green-800'
                                  : 'bg-gray-600'
                              } text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0  transition duration-150 ease-in-out`}
                            >
                              <h1>{aindex + 1}.</h1>
                              <p className="break-words">{answer.answer}</p>
                              <div>
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
                              </div>
                            </div>
                          ))}
                        </div>
                      </details>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <Modal
        key={question.id}
        child={
          <>
            <form
              onSubmit={submitAnswerHadler}
              action=""
              className="w-[100%] lg:w-[60%] h-[60%] bg-neutral-800 items-start justify-start flex flex-col pt-5 gap-4 m-auto"
            >
              <InputForm
                label="Answer"
                name="answer"
                onChange={onchangeAnswerHandler}
                value={createAnswerValues.answer ?? ''}
                required={true}
                pattern={`^(?!\s*$).+`}
                errorMessage="Answer cannot be empty!"
              />
              <Checkbox
                label="Correct Answer"
                onChange={onchangeAnswerHandler}
                name="iscorrect"
              />
              {createAsnwerError && (
                <li className="text-red-500">{createAsnwerError}</li>
              )}
              {/* <InputForm
                label="Type Question"
                name="typeQuestionId"
                readonly={true}
                className="cursor-pointer"
                onClick={() => {
                  if (!tqQuery.data) tqQuery.refetch();
                  setTypeQuestionModal(true);
                }}
                value={typeQuestion.type ?? ''}
                required={true}
              />
              {errorObject.typeQuestion && (
                <span className="text-red-500">
                  <li>{errorObject.typeQuestion}</li>
                </span>
              )}
              {error && <span className="text-red-400">{error}</span>} */}

              <div className="flex items-center justify-center w-full mt-5">
                <PrimaryButton
                  type="submit"
                  text={updateId > 0 ? 'Update Question' : 'Add Question'}
                  isLoading={createAnswerMutation.isLoading}
                />
              </div>
            </form>
          </>
        }
        visible={showCreateAnswerModal}
        onClose={() => {
          setShowCreateAnswerModal(false);
          setQuestion(initQuestionModel);
        }}
        innerDivClassname="w-full md:w-[80%] lg:w-[50%]"
        padding="10px"
        backgroundColor="bg-neutral-800"
      />
    </div>
  );
};

export default Quiz;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetcher(`/api/v1/user`, context.req.headers);
  return { props: { userData: data } };
};
