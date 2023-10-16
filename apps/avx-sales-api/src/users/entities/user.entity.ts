import { IAVXUser, IAVXUserRole } from '@project-x/model';
import * as bcrypt from 'bcrypt';

export class AVXUser implements IAVXUser {
  name: string;
  email: string;
  id: string;
  role: IAVXUserRole;
  password: string;
  isActive: boolean;

  constructor(user: {
    name: string;
    email: string;
    id: string;
    role: IAVXUserRole;
    password: string;
  }) {
    Object.assign(this, user);
    this.isActive = true;
  }

  public async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
