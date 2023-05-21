import { ROLE_REPOSITORY } from 'src/core/constants';
import { Role } from './role.entity';

type DatabaseModelsType = {
  provide: string;
  useValue: any;
};
export const databaseModels: DatabaseModelsType[] = [
  {
    provide: ROLE_REPOSITORY,
    useValue: Role,
  },
];

export const ModelList = [Role];
