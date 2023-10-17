import { IAVXClientUser, IAVXUser, IAuthorizationRole } from '@project-x/model';
import * as bcrypt from 'bcrypt';

export class AVXUser implements IAVXUser {
  name: string;
  email: string;
  id: string;
  role: IAuthorizationRole;
  password: string;
  isActive: boolean;

  constructor(user: {
    name: string;
    email: string;
    id: string;
    role: IAuthorizationRole;
    password: string;
  }) {
    Object.assign(this, user);
    this.isActive = true;
  }

  public async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  public toClientUser(): IAVXClientUser {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      role: this.role,
    };
  }
}
