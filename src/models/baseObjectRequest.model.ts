export type BaseObjectRequestModel<T> = {
  headers: Partial<{
    [key: string]: string;
  }>;
  data: T;
};
