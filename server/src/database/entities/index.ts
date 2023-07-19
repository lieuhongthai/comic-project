import {
  roleEntity,
  groupEntity,
  permissionEntity,
  userGroupEntity,
  userEntity,
} from 'src/core/constants';
import { Role } from './role.entity';
import { User } from './user.entity';
import { Permission } from './permission.entity';
import { Group } from './group.entity';
import { UserGroup } from './userGroup.entity';

type DatabaseModelsType = {
  provide: string;
  useValue: any;
};
export const databaseModels: DatabaseModelsType[] = [
  {
    provide: roleEntity,
    useValue: Role,
  },
  {
    provide: userEntity,
    useValue: User,
  },
  { provide: permissionEntity, useValue: Permission },

  {
    provide: groupEntity,
    useValue: Group,
  },
  {
    provide: userGroupEntity,
    useValue: UserGroup,
  },
];

export const ModelList = [Role, User, Permission, Group, UserGroup];
