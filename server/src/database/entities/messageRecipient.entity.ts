import { DataTypes } from 'sequelize';
import {
  AutoIncrement,
  Column,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Message } from './message.entity';

@Table
export class MessageRecipient extends Model<MessageRecipient> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataTypes.BIGINT })
  id: number;

  @ForeignKey(() => MessageRecipient)
  @Column({ type: DataTypes.BIGINT })
  recipientId: number;

  @Column({ type: DataTypes.BIGINT })
  recipientGroupId: number;

  @ForeignKey(() => Message)
  @Column({ type: DataTypes.BIGINT })
  messageId: number;

  @Default(true)
  @Column
  isRead: boolean;
}
