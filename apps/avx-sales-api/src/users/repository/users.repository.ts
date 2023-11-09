import { Injectable } from '@nestjs/common';
import { AVXUser, User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RepositoryInterface } from 'src/auth/interfaces/repository.interface';

@Injectable()
export class UsersRepository implements RepositoryInterface<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async save(user: AVXUser) {
    const savedUser = await this.userRepository.save(user);
    return savedUser;
  }

  async findOneByEmail(email: string) {
    const foundUser = await this.userRepository.findOne({
      where: { email },
    });
    return new AVXUser(foundUser);
  }

  async findOneById(id: string) {
    const foundUser = await this.userRepository.findOne({
      where: { id },
    });
    return new AVXUser(foundUser);
  }

  async update(toBeUpdatedUser: AVXUser, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userRepository.save({
      ...toBeUpdatedUser,
      ...updateUserDto,
    });
    return new AVXUser(updatedUser);
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(options: any) {
    return this.userRepository.findOne(options);
  }

  async find(options?: any) {
    return this.userRepository.find(options);
  }

  create(user: User) {
    return this.userRepository.create(user);
  }
}
