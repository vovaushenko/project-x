import { ISignInUserDto } from '@project-x/sales-model/src/user/user.model';

export class SignInDto implements ISignInUserDto {
  email: string;
  password: string;
}
