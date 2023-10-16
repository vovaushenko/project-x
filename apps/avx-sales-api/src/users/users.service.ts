import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { AVXUser } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './repository/users.repository';
import { v4 as uuidv4 } from 'uuid';
import { IAVXClientUser } from '@project-x/sales-model';

// https://medium.com/@0xAggelos/building-a-secure-authentication-system-with-nestjs-jwt-and-postgresql-e1b4833b6b4e
@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async create(registerUserDto: RegisterUserDto): Promise<IAVXClientUser> {
    const { name, password, email } = registerUserDto;

    const hashedPassword = await this.hashPassword(password);

    const user = new AVXUser({
      email,
      name,
      id: uuidv4(),
      role: 'user',
      password: hashedPassword,
    });

    const savedUser = this.userRepository.save(user);

    return savedUser.toClientUser();
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async findUserByEmail(email: string): Promise<AVXUser> {
    return this.userRepository.findOneByEmail(email);
  }

  async findUserById(id: string): Promise<AVXUser> {
    return this.userRepository.findOneById(id);
  }
}
