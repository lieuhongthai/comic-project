import { User } from 'src/database/entities/user.entity';

export interface CreateUserType {
  username: string;
  email: string;
  numberPhone: number;
  password: string;
  rePassword?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
}

export const CreateUserDto = typeof User;
