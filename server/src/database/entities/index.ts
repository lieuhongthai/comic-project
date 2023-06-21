import {
  ROLE_REPOSITORY,
  permissionRepository,
  userRepository,
} from 'src/core/constants';
import { Role } from './role.entity';
import { User } from './user.entity';
import { Permission } from './permission.entity';

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
];

export const ModelList = [Role, User, Permission];
