import { IRegisterUserDto } from '@project-x/model';

export class RegisterUserDto implements IRegisterUserDto {
  name: string;
  password: string;
  email: string;
}
