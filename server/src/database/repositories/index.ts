import { UserRepository } from './user.repository';

export const repositories = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: UserRepository,
  },
];
