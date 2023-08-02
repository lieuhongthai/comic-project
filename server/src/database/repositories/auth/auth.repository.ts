import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { userEntity } from 'src/core/constants';
import { User } from '../../entities/user.entity';
import { RoleRepository } from '../role/role.repository';
import { CreateUserType } from '../user/user.interface';
import { Op } from 'sequelize';

@Injectable()
export class AuthRepository {
  @Inject(userEntity)
  private userEntity: typeof User;

  @Inject(RoleRepository)
  private roleRepository: RoleRepository;

  async signUp(user: CreateUserType, roleId?: number) {
    //

    if (user.password !== user.rePassword) {
      throw new ConflictException('Password is not conflict!');
    }
    const [createdUser, isCreate] = await this.userEntity.findOrCreate({
      where: {
        [Op.or]: [{ email: user.email }, { numberPhone: user.numberPhone }],
      },
      defaults: { ...user },
    });
    if (!isCreate)
      throw new ConflictException('Email or number phone already existed! ');
    if (roleId) {
      const role = await this.roleRepository.getById(roleId);
      await createdUser.addRoles([role]);
    }
    await createdUser.setRoles([1]);

    return createdUser;
  }
}
