import * as bcrypt from 'bcrypt';
import { IAVXClientUser, IAVXUser, IAVXUserRole } from '@project-x/sales-model';

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

  public toClientUser(): IAVXClientUser {
    return {
      email: this.email,
      id: this.id,
      name: this.name,
      role: this.role,
    };
  }
}
