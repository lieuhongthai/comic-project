import { IsString, MaxLength } from 'class-validator';

export class SignInDto {
  @IsString()
  @MaxLength(50)
  username: string;

  @MaxLength(50)
  @IsString()
  password: string;
}
