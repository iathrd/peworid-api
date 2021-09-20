import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import * as argon from 'argon2';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(cretaeUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await argon.hash(cretaeUserDto.password);
    const user = this.create({
      ...cretaeUserDto,
      password: hashedPassword,
    });

    try {
      await this.save(user);
      return user;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(error.detail);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
