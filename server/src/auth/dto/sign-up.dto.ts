import { IsEmail, IsNumber, IsString, IsStrongPassword } from 'class-validator';

export class SignUpDto {
  @IsString()
  username: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsNumber()
  numberPhone: number;

  @IsString()
  @IsStrongPassword()
  password: string;

  @IsString()
  @IsStrongPassword()
  rePassword: string;
}
