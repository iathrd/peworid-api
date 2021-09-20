import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepostiror: UserRepository,
  ) {}

  createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepostiror.createUser(createUserDto);
  }
}
