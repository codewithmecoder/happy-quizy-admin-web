export type CurrentUserLogin = {
  id: number;
  displayName: string;
  username: string;
  photo: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
};

export type CurrentUserResponse = {
  data: CurrentUserLogin;
  success: boolean;
};

export type LoginUserResponse = {
  data: UserTokenModel;
  success: boolean;
};

export type UserTokenModel = {
  accessToken: string;
  refreshToken: string;
  user: CurrentUserLogin;
};
