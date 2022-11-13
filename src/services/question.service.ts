import { axiosInstance } from '../utils/axiosBase';
import fetcher from '../utils/fetcher';

export const createQuestion = (newQuestion: void) => {
  return axiosInstance.post('/api/v1/question', newQuestion);
};

export const getQuestionByTypeQuestion = async (id: number) => {
  // return useQuery<
  //   BaseResponse<QuestionModel[] | MessageResponseModel>,
  //   AxiosError
  // >([Constants.queries.question], () =>

  // );
  const { data } = await fetcher<any>(`/api/v1/question/byType/${id}`);
  return data;
};
