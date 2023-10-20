import { IUpdateUserInfoDto } from '@project-x/model';
export class UpdateUserDto implements IUpdateUserInfoDto {
  name: string;
  password: string;
  email: string;
}
