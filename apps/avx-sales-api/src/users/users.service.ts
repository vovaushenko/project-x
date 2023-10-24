import { Injectable, NotFoundException } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { AVXUser } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './repository/users.repository';
import { IAVXClientUser } from '@project-x/model';
import { UpdateUserDto } from './dto/update-user.dto';
import { getUUID } from 'src/common/uuid';

// https://medium.com/@0xAggelos/building-a-secure-authentication-system-with-nestjs-jwt-and-postgresql-e1b4833b6b4e
@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async create(registerUserDto: RegisterUserDto): Promise<IAVXClientUser> {
    const { password, email } = registerUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new AVXUser({
      id: getUUID(),
      email,
      name: '',
      role: 'user',
      password: hashedPassword,
    });
    await this.userRepository.save(user);

    return user.toClientUser();
  }

  async findUserByEmail(email: string) {
    const foundUser = await this.userRepository.findOneByEmail(email);
    if (!foundUser) {
      throw new NotFoundException('Resource not found');
    }

    return foundUser;
  }

  async findUserById(id: string) {
    const foundUser = await this.userRepository.findOneById(id);
    if (!foundUser) {
      throw new NotFoundException('Resource not found');
    }
    return foundUser;
  }

  async getUserInfoById(id: string) {
    const foundUser = await this.userRepository.findOneById(id);
    if (!foundUser) {
      throw new NotFoundException('Resource not found');
    }
    return foundUser.toClientUser();
  }

  async updateUserInfoById(id: string, updateUserDto: UpdateUserDto) {
    const toBeUpdatedUser = await this.findUserById(id);

    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
    }

    const updatedUser = await this.userRepository.update(
      toBeUpdatedUser,
      updateUserDto,
    );

    return updatedUser.toClientUser();
  }

  async getAllUsers() {
    return await this.userRepository.findAll();
  }
}
