import { DataTypes } from 'sequelize';
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  BelongsToMany,
  AllowNull,
  Default,
} from 'sequelize-typescript';
import { Role } from './role.entity';
import { Permission } from './permission.entity';
import { Group } from './group.entity';
import { UserGroup } from './userGroup.entity';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataTypes.INTEGER({}) })
  id: number;

  @AllowNull(false)
  @Column({ type: DataTypes.STRING(50) })
  username: string;

  @Column({ type: DataTypes.STRING(50) })
  firstName: string;

  @Column({ type: DataTypes.STRING(50) })
  lastName: string;

  @Column({ type: DataTypes.STRING(100) })
  fullName: string;

  @AllowNull(false)
  @Column({ type: DataTypes.STRING(100) })
  email: string;

  @Column({ type: DataTypes.SMALLINT })
  numberPhone: number;

  @Default(true)
  @Column
  isActive: boolean;

  @BelongsToMany(() => Role, () => Permission, 'userId', 'roleId')
  roles: Role[];
  setRoles: (args: any[]) => Promise<Role[]>;
  addRoles: (args: Role[]) => Promise<Role[]>;
  createRole: (arg: any) => Promise<any>;
  getRoles: () => Promise<Role[]>;
  countRoles: () => Promise<number>;

  @BelongsToMany(() => Group, () => UserGroup, 'userId', 'groupId')
  groups: Group[];
}
