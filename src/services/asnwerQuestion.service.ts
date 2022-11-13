import { axiosInstance } from '../utils/axiosBase';

export const createAnswer = (newAnswer: void) => {
  return axiosInstance.post(
    '/api/v1/asnwerQuestion/createSingalAnswer',
    newAnswer
  );
};
