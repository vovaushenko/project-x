export type ISalesSignInDto = {
  email: string;
  password: string;
};

export type ISalesSignInApiResponse = {
  accessToken: string;
  refreshToken: string;
};

export type ISalesRefreshTokenDto = {
  refreshToken: string;
};

export type ISalesRefreshTokenApiResponse = {
  accessToken: string;
};
