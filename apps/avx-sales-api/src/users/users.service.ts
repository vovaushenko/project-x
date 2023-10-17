import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { AVXUser } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './repository/users.repository';
import { IAVXClientUser } from '@project-x/model';

// https://medium.com/@0xAggelos/building-a-secure-authentication-system-with-nestjs-jwt-and-postgresql-e1b4833b6b4e
@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async create(registerUserDto: RegisterUserDto): Promise<IAVXClientUser> {
    const { name, password, email } = registerUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new AVXUser({
      email,
      name,
      id: Math.floor(Math.random() * 1000).toString(),
      role: 'user',
      password: hashedPassword,
    });

    await this.userRepository.save(user);

    return user.toClientUser();
  }

  async findUserByEmail(email: string): Promise<AVXUser> {
    return this.userRepository.findOneByEmail(email);
  }
}
