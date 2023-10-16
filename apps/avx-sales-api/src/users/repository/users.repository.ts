import { Injectable } from '@nestjs/common';
import { AVXUser } from '../entities/user.entity';

@Injectable()
export class UsersRepository {
  users: AVXUser[] = [];

  save(user: AVXUser) {
    this.users.push(user);
    return user;
  }

  findOneByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  findOneById(id: string) {
    return this.users.find((user) => user.id === id);
  }
}
