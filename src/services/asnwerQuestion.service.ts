import { AnswerQuestionModel } from '../models/answerQuestion.model';
import { BaseObjectRequestModel } from '../models/baseObjectRequest.model';
import { axiosInstance } from '../utils/axiosBase';

export const createAnswer = (newAnswer: void) => {
  const obj: BaseObjectRequestModel<{
    answer: string;
    iscorrect: string;
    questionId: number;
    typeQuestionId: number;
  }> = newAnswer as any;
  return axiosInstance.post(
    '/api/v1/asnwerQuestion/createSingleAnswer',
    obj.data,
    {
      headers: {
        Authorization: `${obj.headers.accessToken}`,
        'x-refresh': obj.headers.refreshToken,
      },
    }
  );
};
export const updateAnswer = (answer: void) => {
  const obj: BaseObjectRequestModel<AnswerQuestionModel> = answer as any;
  return axiosInstance.put(
    '/api/v1/asnwerQuestion/updateSingleAnswer',
    obj.data,
    {
      headers: {
        Authorization: `${obj.headers.accessToken}`,
        'x-refresh': obj.headers.refreshToken,
      },
    }
  );
};

export const deleteAnswer = (deleteAns: void) => {
  const obj: BaseObjectRequestModel<{ id: number }> = deleteAns as any;
  return axiosInstance.delete(`/api/v1/asnwerQuestion/${obj.data.id}`, {
    headers: {
      Authorization: `${obj.headers.accessToken}`,
      'x-refresh': obj.headers.refreshToken,
    },
  });
};
