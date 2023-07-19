import { Inject, Injectable } from '@nestjs/common';
import { userEntity } from 'src/core/constants';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  @Inject(userEntity)
  private userEntity: typeof User;
  async findAll() {
    return await this.userEntity.findAll();
  }
}
