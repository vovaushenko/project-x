import { IRegisterUserDto } from '@project-x/sales-model/src/user/user.model';

export class RegisterUserDto implements IRegisterUserDto {
  name: string;
  password: string;
  email: string;
}
