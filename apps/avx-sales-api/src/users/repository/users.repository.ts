import { Injectable } from '@nestjs/common';
import { AVXUser } from '../entities/user.entity';

@Injectable()
export class UsersRepository {
  users: AVXUser[] = [];

  async save(user: AVXUser) {
    this.users.push(user);
    return user;
  }

  async findOneByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  async findOneById(id: string) {
    return this.users.find((user) => user.id === id);
  }
}
