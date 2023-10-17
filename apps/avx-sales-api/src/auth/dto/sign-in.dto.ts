import { ISalesSignInDto } from '@project-x/model';

export class SignInDto implements ISalesSignInDto {
  email: string;
  password: string;
}
