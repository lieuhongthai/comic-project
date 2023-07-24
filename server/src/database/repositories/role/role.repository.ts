import { Inject } from '@nestjs/common';
import { dataRole, roleEntity } from 'src/core/constants';
import { Role } from 'src/database/entities/role.entity';

export class RoleRepository {
  // ** Imports entity
  @Inject(roleEntity)
  private roleEntity: typeof Role;

  async dumpData() {
    const roles = Object.values(dataRole);

    return await this.roleEntity.bulkCreate(roles, { ignoreDuplicates: true });
  }

  async getById(id: number) {
    return this.roleEntity.findByPk(id);
  }
}
