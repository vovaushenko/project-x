import { IAVXClientUser, IAVXUser, IAuthorizationRole } from '@project-x/model';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  static fromDbUser(user: User): AVXUser {
    return new AVXUser(user);
  }
}

@Entity({
  name: 'users',
  synchronize: false,
})
export class User extends BaseEntity implements IAVXUser {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  role: IAuthorizationRole;

  @Column()
  isActive: boolean;

  @Column()
  password: string;
}
