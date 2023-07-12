import { DataTypes } from 'sequelize';
import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from './user.entity';
import { ReminderFrequency } from './reminderFrequency.entity';

@Table({ tableName: 'messages' })
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

  @Column({ type: DataTypes.TEXT })
  messageBody: string;

  @ForeignKey(() => Message)
  @Column({ type: DataTypes.BIGINT })
  parentMessageId: number;

  @Column({ type: DataTypes.DATE })
  expiryDate: Date;

  @Column
  isReminder: number;

  @Column
  nextRemindDate: Date;

  // ** Foreign key message
  @ForeignKey(() => ReminderFrequency)
  @Column
  reminderFrequencyId: number;

  @BelongsTo(() => ReminderFrequency)
  reminderFrequency: ReminderFrequency;

  @HasMany(() => Message)
  parentMessage: number;
}
