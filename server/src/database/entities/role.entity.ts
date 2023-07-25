import { DataTypes } from 'sequelize';
import {
  BelongsToMany,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from './user.entity';
import { Permission } from './permission.entity';

@Table({ tableName: 'roles' })
export class Role extends Model<Role> {
  @PrimaryKey
  @Column({ type: DataTypes.SMALLINT({ scale: 2 }) })
  id: number;

  @Column({ type: DataTypes.STRING(50) })
  name: string;

  @BelongsToMany(() => User, () => Permission)
  users: User[];
}
