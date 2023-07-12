import {
  BelongsToMany,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from './user.entity';
import { UserGroup } from './userGroup.entity';

@Table({ tableName: 'groups' })
export class Group extends Model<Group> {
  @PrimaryKey
  @Column
  id: number;

  @Column
  name: string;

  @Column
  isActive: boolean;

  @BelongsToMany(() => User, () => UserGroup)
  users: User[];
}
