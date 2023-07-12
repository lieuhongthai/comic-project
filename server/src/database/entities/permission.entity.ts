import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from './user.entity';
import { Role } from './role.entity';
import { DataTypes } from 'sequelize';

@Table({ tableName: 'permissions' })
export class Permission extends Model<Permission> {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Role)
  @Column({ type: DataTypes.SMALLINT({ scale: 2 }) })
  roleId: number;
}
