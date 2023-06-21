import { DataTypes } from 'sequelize';
import {
  AutoIncrement,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from './user.entity';

@Table
export class Message extends Model<Message> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataTypes.BIGINT })
  id: number;

  @Column({ type: DataTypes.STRING(100) })
  subject: string;

  @ForeignKey(() => User)
  @Column
  creatorId: number;

  @ForeignKey(() => Message)
  @Column({ type: DataTypes.BIGINT })
  parentMessageId: number;

  @Column({ type: DataTypes.TEXT })
  messageBody: string;

  @Column({ type: DataTypes.DATE })
  expiryDate: Date;

  @Column
  isReminder: number;

  @Column
  nextRemindDate: Date;

  // ** Foreign key message
  @Column
  reminderFrequencyId: number;
}
