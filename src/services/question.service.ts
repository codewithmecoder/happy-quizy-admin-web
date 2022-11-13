import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { BaseResponse } from '../models/baseResponse.model';
import { MessageResponseModel } from '../models/messageResponse.model';
import { QuestionModel } from '../models/question.model';
import { axiosInstance } from '../utils/axiosBase';
import { Constants } from '../utils/constants';
import fetcher from '../utils/fetcher';

export const createQuestion = (newQuestion: void) => {
  return axiosInstance.post('/api/v1/question', newQuestion);
};

export const getQuestionByTypeQuestion = (id: number) => {
  return useQuery<
    BaseResponse<QuestionModel[] | MessageResponseModel>,
    AxiosError
  >([Constants.queries.question], () =>
    fetcher<any>(`/api/v1/question/byType/${id}`)
  );
};
