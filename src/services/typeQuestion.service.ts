import { BaseObjectRequestModel } from '../models/baseObjectRequest.model';
import { BaseResponse } from '../models/baseResponse.model';
import { MessageResponseModel } from '../models/messageResponse.model';
import {
  TypeQuestionModel,
  TypeQuestionUpdateModel,
} from '../models/typeQuestion.model';
import { TypeQuestionValues } from '../pages/typequestion';
import { axiosInstance } from '../utils/axiosBase';
import fetcher from '../utils/fetcher';

export const createTypeQuestion = (typeQuestion: void) => {
  const obj: BaseObjectRequestModel<TypeQuestionValues> = typeQuestion as any;
  return axiosInstance.post('/api/v1/typeQuestion', obj.data, {
    headers: {
      Authorization: `Bearer ${obj.headers.accessToken}`,
      'x-refresh': obj.headers.refreshToken,
    },
  } as any);
};

export const fetchTypeQuestions = (
  headers: Partial<{ [key: string]: string }>
) => {
  return fetcher<BaseResponse<TypeQuestionModel[] | MessageResponseModel>>(
    '/api/v1/typeQuestion',
    {
      Authorization: `Bearer ${headers.accessToken}`,
      'x-refresh': headers.refreshToken,
    }
  );
};

export const fetchOnlyTypeQuestions = (
  headers: Partial<{ [key: string]: string }>
) => {
  return fetcher<BaseResponse<TypeQuestionModel[] | MessageResponseModel>>(
    '/api/v1/typeQuestion/onlyTypeQuestion',
    {
      Authorization: `Bearer ${headers.accessToken}`,
      'x-refresh': headers.refreshToken,
    }
  );
};

export const updateTypeQuestion = (typeQuestionUpdate: void) => {
  const obj: BaseObjectRequestModel<TypeQuestionUpdateModel> =
    typeQuestionUpdate as any;
  console.log(obj);
  return axiosInstance.put(
    `/api/v1/typeQuestion/${obj.data.id}`,
    {
      type: obj.data.type,
      photo: obj.data.photo,
      photoName: obj.data.photoName,
    },
    {
      headers: {
        Authorization: `Bearer ${obj.headers.accessToken}`,
        'x-refresh': obj.headers.refreshToken,
      },
    }
  );
};

export const deleteTypeQuestion = (deleteTypeQuestion: void) => {
  const obj: BaseObjectRequestModel<{ id: number }> = deleteTypeQuestion as any;
  return axiosInstance.delete(`/api/v1/typeQuestion/${obj.data.id}`, {
    headers: {
      Authorization: `Bearer ${obj.headers.accessToken}`,
      'x-refresh': obj.headers.refreshToken,
    },
  });
};
