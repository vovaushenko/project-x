import { Injectable } from '@nestjs/common';
import { AVXUser } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersRepository {
  static _instance: UsersRepository;
  constructor() {
    if (UsersRepository._instance) {
      return UsersRepository._instance;
    }
    UsersRepository._instance = this;
  }

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

  async updateUserInfoById(id: string, updateUserDto: UpdateUserDto) {
    const userToUpdate = this.findOneById(id);
    if (!userToUpdate) {
      return false;
    }
    this.users = this.users.map((user) =>
      user.id === id ? new AVXUser({ ...user, ...updateUserDto }) : user,
    );

    return true;
  }
}
