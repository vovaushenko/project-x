export type {
  IAVXUser,
  IAuthorizationRole,
  IRegisterUserDto,
  IUpdateUserInfoDto,
  IAVXClientUser,
  IRegistrUserOnClientDto,
} from './user/user.model';
export { registerUserSchema, signUpClientUserSchema } from './user/user.model';
export type { IAVXOpportunity, ICreateAvxOpportunityDto } from './opportunity/opportunity.model';
export type {
  ISalesSignInDto,
  ISalesSignInApiResponse,
  ISalesRefreshTokenDto,
  ISalesRefreshTokenApiResponse,
} from './sales-api/auth/auth.model';
