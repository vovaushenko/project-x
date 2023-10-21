import { IRegisterUserDto } from '@project-x/model';

export class RegisterUserDto implements IRegisterUserDto {
  password: string;
  email: string;
}
