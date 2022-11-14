import { axiosInstance } from '../utils/axiosBase';
import fetcher from '../utils/fetcher';

export const createQuestion = (newQuestion: void) => {
  return axiosInstance.post('/api/v1/question', newQuestion);
};

export const updateQuestion = (question: void) => {
  return axiosInstance.put(
    `/api/v1/question/${(question as any).id}`,
    question
  );
};
export const getQuestionByTypeQuestion = async (id: number) => {
  const { data } = await fetcher<any>(`/api/v1/question/byType/${id}`);
  return data;
};
export const deleteQuestion = (id: void) => {
  return axiosInstance.delete(`/api/v1/question/${id}`);
};
