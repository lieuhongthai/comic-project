import { DataTypes } from 'sequelize';
import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class Role extends Model<Role> {
  @PrimaryKey
  @Column({ type: DataTypes.INTEGER({ scale: 2 }) })
  id: number;

  @Column({ type: DataTypes.STRING(50) })
  name: string;
}
