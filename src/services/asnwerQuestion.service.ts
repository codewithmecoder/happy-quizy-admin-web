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
    { Authorization: `${obj.headers.accessToken}` } as any
  );
};
export const updateAnswer = (answer: void) => {
  return axiosInstance.put('/api/v1/asnwerQuestion/updateSingleAnswer', answer);
};

export const deleteAnswer = (id: void) => {
  return axiosInstance.delete(`/api/v1/asnwerQuestion/${id}`);
};
