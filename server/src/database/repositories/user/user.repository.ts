import { Inject, Injectable } from '@nestjs/common';
import { userEntity } from 'src/core/constants';
import { User } from '../../entities/user.entity';
import { CreateUserType } from './user.interface';
import { RoleRepository } from '../role/role.repository';

@Injectable()
export class UserRepository {
  @Inject(userEntity)
  private userEntity: typeof User;

  @Inject(RoleRepository)
  private roleRepository: RoleRepository;

  async findAll() {
    return await this.userEntity.findAll();
  }

  async createdOne(user: CreateUserType, roleId?: number) {
    //
    const createdUser = await User.create(user);
    if (roleId) {
      const role = await this.roleRepository.getById(roleId);
      await createdUser.addRoles([role]);
    }
    createdUser.createRole(1);

    return createdUser;
  }
}
