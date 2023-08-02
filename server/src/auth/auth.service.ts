import { Inject, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UserRepository } from 'src/database/repositories/user/user.repository';
import { SignInDto } from './dto/sign-in.dto';
import { AuthRepository } from 'src/database/repositories/auth/auth.repository';

@Injectable()
export class AuthService {
  // ** Inject repository
  @Inject(AuthRepository)
  private authRepo: AuthRepository;

  async signUp(signUpDto: SignUpDto) {
    return await this.authRepo.signUp(signUpDto);
  }

  async signIn(signInDto: SignInDto) {
    return;
  }
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
