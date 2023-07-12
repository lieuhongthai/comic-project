import {
  ROLE_REPOSITORY,
  groupRepository,
  permissionRepository,
  userGroupRepository,
  userRepository,
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
    provide: ROLE_REPOSITORY,
    useValue: Role,
  },
  {
    provide: userRepository,
    useValue: User,
  },
  { provide: permissionRepository, useValue: Permission },

  {
    provide: groupRepository,
    useValue: Group,
  },
  {
    provide: userGroupRepository,
    useValue: UserGroup,
  },
];

export const ModelList = [Role, User, Permission, Group, UserGroup];
