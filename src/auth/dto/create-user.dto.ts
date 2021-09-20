import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  id: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber('ID')
  phoneNumber: string;

  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
  password: string;
}
