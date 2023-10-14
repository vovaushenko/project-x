import { IUser, IAuthorizationRole } from '@project-x/model';
import * as bcrypt from 'bcrypt';

export class AVXUser implements IUser {
  name: string;
  email: string;
  id: string;
  role: IAuthorizationRole;
  password: string;

  constructor(user: {
    name: string;
    email: string;
    id: string;
    role: IAuthorizationRole;
    password: string;
  }) {
    Object.assign(this, user);
  }

  public async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
