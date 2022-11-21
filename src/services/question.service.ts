import { BaseObjectRequestModel } from '../models/baseObjectRequest.model';
import { axiosInstance } from '../utils/axiosBase';
import fetcher from '../utils/fetcher';

export const createQuestion = (newQuestion: void) => {
  const obj: BaseObjectRequestModel<{
    content: string;
    typeQuestionId: string;
  }> = newQuestion as any;
  return axiosInstance.post('/api/v1/question', obj.data, {
    headers: {
      Authorization: `Bearer ${obj.headers.accessToken}`,
      'x-refresh': obj.headers.refreshToken,
    },
  });
};

export const updateQuestion = (question: void) => {
  const obj: BaseObjectRequestModel<{
    content: string;
    typeQuestionId: string;
    id: number;
  }> = question as any;
  return axiosInstance.put(`/api/v1/question/${obj.data.id}`, obj.data, {
    headers: {
      Authorization: `Bearer ${obj.headers.accessToken}`,
      'x-refresh': obj.headers.refreshToken,
    },
  });
};
export const getQuestionByTypeQuestion = async (
  id: number,
  headers: Partial<{ [kay: string]: string }>
) => {
  const { data } = await fetcher<any>(`/api/v1/question/byType/${id}`, {
    Authorization: `Bearer ${headers.accessToken}`,
    'x-refresh': headers.refreshToken,
  });
  return data;
};
export const deleteQuestion = (deleteQues: void) => {
  const obj: BaseObjectRequestModel<{ id: number }> = deleteQues as any;
  return axiosInstance.delete(`/api/v1/question/${obj.data.id}`, {
    headers: {
      Authorization: `Bearer ${obj.headers.accessToken}`,
      'x-refresh': obj.headers.refreshToken,
    },
  });
};
