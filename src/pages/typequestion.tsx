import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { BsTrash } from 'react-icons/bs';
import Moment from 'react-moment';
import { v4 } from 'uuid';
import BackButton from '../components/BackButton';
import DangerButton from '../components/DangerButton';
import InputForm from '../components/InputForm';
import Loading from '../components/Loading';
import Modal from '../components/Modal';
import MyHead from '../components/MyHead';
import PrimaryButton from '../components/PrimaryButton';
import { BaseResponse } from '../models/baseResponse.model';
import { MessageResponseModel } from '../models/messageResponse.model';
import { TypeQuestionModel } from '../models/typeQuestion.model';
import {
  createTypeQuestion,
  deleteTypeQuestion,
  fetchOnlyTypeQuestions,
  updateTypeQuestion,
} from '../services/typeQuestion.service';
import { Constants } from '../utils/constants';
import fetcher from '../utils/fetcher';
import { storage } from '../utils/firebase.config';

export interface TypeQuestionValues {
  type: string | null;
  photo: null | string;
  photoName?: null | string;
}

const typeQuestionInit: TypeQuestionModel = {
  id: 0,
  type: '',
  photo: null,
  questions: [],
  photoName: null,
};

const TypeQuestion: NextPage<{
  headers: Partial<{
    [key: string]: string;
  }>;
}> = ({ headers }) => {
  const [deleteModalData, setDeleteModalData] =
    useState<TypeQuestionModel>(typeQuestionInit);
  const [photo, setPhoto] = useState<FileList | null>();
  const [updateObj, setUpdateObj] =
    useState<TypeQuestionModel>(typeQuestionInit);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const photoRef = useRef<HTMLInputElement>(null);
  const [typeQuestionValues, setTypeQuestionValues] =
    useState<TypeQuestionValues>({ photo: null, type: null });
  const [errorObject, setErrorObject] = useState<TypeQuestionValues>({
    photo: null,
    type: null,
  });
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const mutation = useMutation(createTypeQuestion, {
    onSuccess: () => {
      setTypeQuestionValues({ ...typeQuestionValues, type: '', photo: null });
      refetch();
    },
  });

  const mutationUpdate = useMutation(updateTypeQuestion, {
    onSuccess: async ({ data }) => {
      if (data.success) {
        if (
          data?.data?.photoName &&
          data?.data?.photoName != typeQuestionValues.photoName
        ) {
          await deleteFileFromFirebase(updateObj.photoName);
        }

        setUpdateObj(typeQuestionInit);
        setTypeQuestionValues({
          ...typeQuestionValues,
          type: '',
          photo: null,
          photoName: null,
        });
        refetch();
      }
    },
  });

  const mutationDelete = useMutation(deleteTypeQuestion, {
    onSuccess: async ({ data }) => {
      const messageResponse = data as BaseResponse<MessageResponseModel>;
      if (!messageResponse.success) {
        setDeleteError(messageResponse.data.message);
      } else {
        await deleteFileFromFirebase(deleteModalData.photoName);
        setDeleteModalData(typeQuestionInit);
        refetch();
        setShowDeleteModal(false);
        setDeleteError(null);
      }
    },
    onError: (error: AxiosError) => {
      setDeleteError(error.message);
    },
  });

  const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTypeQuestionValues({
      ...typeQuestionValues,
      [e.target.name]: e.target.value,
    });
  };
  let errorCount: number = 0;
  const validate = (value: TypeQuestionValues) => {
    const error: TypeQuestionValues = {
      type: null,
      photo: null,
    };
    if (!value.photo) {
      error.photo = 'Please choose a photo!';
      errorCount++;
    }
    if (!value.type) {
      error.type = 'Name Type Question cannot be empty!';
      errorCount++;
    }
    return error;
  };

  const submitHadler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorObject(validate(typeQuestionValues));
    if (errorCount > 0) {
      errorCount = 0;
      return;
    }
    const file = await uploadFile(photo);
    updateObj.id > 0
      ? mutationUpdate.mutate({
          data: {
            ...typeQuestionValues,
            photo: file?.url ? file?.url : typeQuestionValues.photo,
            photoName: file?.name,
            id: updateObj.id,
          },
          headers,
        } as any)
      : mutation.mutate({
          data: {
            ...typeQuestionValues,
            photo: file?.url,
            photoName: file?.name,
          },
          headers,
        } as any);
  };
  const { data, isError, isLoading, isSuccess, refetch } = useQuery(
    [Constants.queries.typeQuestion],
    async () => await fetchOnlyTypeQuestions(headers)
  );

  const uploadFile = async (
    imageUpload: FileList | null | undefined
  ): Promise<{ url: string; name: string } | null> => {
    if (!imageUpload) return null;
    const file = imageUpload.item(0);
    const imageRef = ref(storage, `images/${file?.name + v4()}`);
    const snapshot = await uploadBytes(imageRef, file!);
    const url = await getDownloadURL(snapshot.ref);
    return { url, name: snapshot?.metadata?.name };
  };

  const deleteFileFromFirebase = async (url: string | null) => {
    if (!url) return;
    const fileRef = ref(storage, `images/${url}`);
    await deleteObject(fileRef);
  };

  const onCloseDeleteModal = () => {
    setUpdateObj(typeQuestionInit);
    setDeleteError(null);
    setShowDeleteModal(false);
  };

  return (
    <div className="md:max-w-[80%] w-[100%] lg:max-w-[60%] m-auto px-5">
      <MyHead title="Happy Quizy - Type Questions" />
      <BackButton href="/quiz" />

      <form
        onSubmit={submitHadler}
        action=""
        className="w-[100%] lg:w-[60%] h-[60%] bg-neutral-800 items-start justify-start flex flex-col pt-5 gap-4 m-auto"
      >
        <InputForm
          label="Name Type Question"
          name="type"
          onChange={onchangeHandler}
          value={typeQuestionValues.type ?? ''}
        />
        <span className="text-red-500">
          {errorObject.type && <li>{errorObject.type}</li>}
        </span>
        <div
          className="flex flex-col bg-gray-700 rounded-lg shadow-xl items-center space-y-1 m-auto cursor-pointer"
          onClick={() => photoRef.current?.click()}
        >
          <div className="flex flex-col w-full h-72 relative">
            <Image
              src={
                typeQuestionValues.photo
                  ? typeQuestionValues.photo
                  : '/assets/images/select-image.jpg'
              }
              alt="happy-quizy"
              className="w-full h-full rounded-lg shadow-md"
              priority
              object-fit="contain"
              width={400}
              height={400}
            />
          </div>
          <input
            name="photo"
            ref={photoRef}
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => {
              const length = e.target.files?.length ?? 0;
              if (length <= 0) return;
              let pic = URL.createObjectURL(e.target.files![0]);
              setPhoto(e.target.files);
              setTypeQuestionValues({
                ...typeQuestionValues,
                [e.target.name]: pic,
              });
            }}
          />
        </div>
        <span className="text-red-500">
          {errorObject.photo && <li>{errorObject.photo}</li>}
        </span>
        <div className="flex items-center justify-center w-full mt-5">
          <PrimaryButton
            type="submit"
            text={
              updateObj.id > 0 ? 'Update Type Question' : 'Add Type Question'
            }
            isLoading={
              updateObj.id > 0 ? mutationUpdate.isLoading : mutation.isLoading
            }
          />
        </div>
      </form>
      <fieldset className="flex items-center justify-center text-white border p-3 rounded w-[100%]">
        <legend>List Of Type Questions</legend>
        {isError && <p>Error fetching data</p>}
        {isLoading && <Loading size="medium" />}
        {isSuccess && (
          <table className="table-auto w-[90%] text-left">
            <thead>
              <tr>
                <th>No</th>
                <th>Type Questions</th>
                <th>Photo</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.success ? (
                (data.data as TypeQuestionModel[])?.map((typeQ, index) => (
                  <tr key={typeQ.id}>
                    <td>{index + 1}</td>
                    <td>{typeQ.type}</td>
                    <td>
                      <div className="w-10 h-10">
                        <Image
                          src={
                            typeQ.photo && typeQ.photo !== ''
                              ? typeQ.photo
                              : '/assets/images/no_image_available.png'
                          }
                          alt={typeQ.type}
                          className="w-full h-full rounded-full shadow-md"
                          priority
                          object-fit="contain"
                          width={50}
                          height={50}
                        />
                      </div>
                    </td>
                    <td>
                      <Moment format="DD-MM-YYYY">{typeQ.createdAt}</Moment>
                    </td>
                    <td>
                      <Moment format="DD-MM-YYYY">{typeQ.updatedAt}</Moment>
                    </td>
                    <td className="flex">
                      <BsTrash
                        onClick={() => {
                          setShowDeleteModal(true);
                          setDeleteModalData(typeQ);
                        }}
                        className="w-7 h-7 text-red-600 cursor-pointer"
                      />
                      <BiEdit
                        onClick={() => {
                          setUpdateObj(typeQ);
                          setTypeQuestionValues({
                            ...typeQuestionValues,
                            type: typeQ.type,
                            photo: typeQ.photo,
                            photoName: typeQ.photoName,
                          });
                        }}
                        className="w-7 h-7 text-yellow-500 cursor-pointer"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <p></p>
              )}
            </tbody>
          </table>
        )}
      </fieldset>
      <Modal
        key={deleteModalData?.id}
        child={
          <>
            <div className="flex items-center justify-center p-3">
              <p className="text-md">
                Are you sure want to delete {`"${deleteModalData?.type}"`}
              </p>
            </div>
            {deleteError && (
              <div className="my-2 px-2">
                <li className="text-red-500">{deleteError}</li>
              </div>
            )}

            <div className="flex gap-5 px-4">
              <PrimaryButton
                text="No"
                type="button"
                onClick={onCloseDeleteModal}
              />
              <DangerButton
                text="Yes"
                type="button"
                onClick={() => {
                  mutationDelete.mutate({
                    data: { id: deleteModalData?.id },
                    headers,
                  } as any);
                }}
                isLoading={mutationDelete.isLoading}
              />
            </div>
          </>
        }
        visible={showDeleteModal}
        onClose={onCloseDeleteModal}
        height="auto"
        width="auto"
        padding="10px"
      />
    </div>
  );
};

export default TypeQuestion;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetcher<BaseResponse<object>>(`/api/v1/user`, {
    cookie: context.req.headers.cookie,
  });
  if (!data?.success) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: { userData: data, headers: context.req.cookies },
  };
};
