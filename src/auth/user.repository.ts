import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import * as argon from 'argon2';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(cretaeUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await argon.hash(cretaeUserDto.password);
    const user = this.create({
      ...cretaeUserDto,
      password: hashedPassword,
    });
    await this.create(user);

    return user;
  }
}
