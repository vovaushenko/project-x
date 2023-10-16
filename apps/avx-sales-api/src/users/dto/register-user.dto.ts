import { IAVXUser } from '@project-x/model';

export type IRegisterUserDto = Omit<IAVXUser, 'id' | 'role' | 'isActive'>;

export class RegisterUserDto implements IRegisterUserDto {
  name: string;
  password: string;
  email: string;
}
