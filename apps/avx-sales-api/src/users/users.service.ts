import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { AVXUser } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './repository/users.repository';
import { IAVXClientUser } from '@project-x/model';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

// https://medium.com/@0xAggelos/building-a-secure-authentication-system-with-nestjs-jwt-and-postgresql-e1b4833b6b4e
@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    private prisma: PrismaService,
  ) {}

  async create(registerUserDto: RegisterUserDto): Promise<IAVXClientUser> {
    const { password, email } = registerUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new AVXUser({
      email,
      name: email,
      id: Math.floor(Math.random() * 1000).toString(),
      role: 'user',
      password: hashedPassword,
    });

    await this.userRepository.save(user);
    const saveUserResult = await this.prisma.aVXUser.create({
      data: user,
    });
    console.log({
      saveUserResult,
    });

    return user.toClientUser();
  }

  /**
   * @description gets full user details
   */
  async findUserByEmail(email: string): Promise<AVXUser> {
    return this.userRepository.findOneByEmail(email);
  }

  /**
   * @description gets subset of user info excluding sensitive information
   */
  async getUserInfoById(id: string): Promise<IAVXClientUser> {
    const user = await this.userRepository.findOneById(id);

    if (!user || !user.isActive) {
      return null;
    }

    return user.toClientUser();
  }

  async updateUserInfoById(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<boolean> {
    const { name, email } = updateUserDto;
    let password = updateUserDto.password;
    if (password) {
      const salt = await bcrypt.genSalt();
      password = await bcrypt.hash(password, salt);
    }
    const validateUserInfo = { name, password, email };
    Object.keys(validateUserInfo).forEach((key) =>
      !validateUserInfo[key] ? delete validateUserInfo[key] : {},
    );

    return this.userRepository.updateUserInfoById(id, { ...validateUserInfo });
  }
}
