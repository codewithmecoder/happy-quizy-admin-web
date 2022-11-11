import { BaseResponse } from '../models/baseResponse.model';
import { MessageResponseModel } from '../models/messageResponse.model';
import { TypeQuestionModel } from '../models/typeQuestion.model';
import { axiosInstance } from '../utils/axiosBase';
import fetcher from '../utils/fetcher';

export const createTypeQuestion = (typeQuestion: void) => {
  return axiosInstance.post('/api/v1/typeQuestion', typeQuestion);
};

export const fetchTypeQuestions = () => {
  return fetcher<BaseResponse<TypeQuestionModel[] | MessageResponseModel>>(
    '/api/v1/typeQuestion'
  );
};

export const updateTypeQuestion = (id: number) => {
  return axiosInstance.put(`/api/v1/typeQuestion/${id}`);
};
