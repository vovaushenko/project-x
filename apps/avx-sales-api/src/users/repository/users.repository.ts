import { Injectable } from '@nestjs/common';
import { AVXUser } from '../entities/user.entity';

@Injectable()
export class UsersRepository {
  users: AVXUser[] = [];

  save(user: AVXUser) {
    this.users.push(user);
    console.log({ users: this.users });
    return user;
  }

  findOne(email: string) {
    return this.users.find((user) => user.email === email);
  }
}
