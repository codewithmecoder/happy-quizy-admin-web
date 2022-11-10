export type CurrentUserLogin = {
  id: number;
  displayName: string;
  username: string;
  photo: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
};
