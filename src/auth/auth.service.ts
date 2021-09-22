import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(createUserDto);
  }

  async signIn(signInUserDto: SignInUserDto): Promise<string> {
    const { email, password } = signInUserDto;
    const user = await this.userRepository.findOne({ email });
    const validPassword = await argon.verify(user.password, password);

    if (validPassword) {
      return 'OK';
    } else {
      throw new UnauthorizedException();
    }
  }
}
