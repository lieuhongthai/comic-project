import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'reminder_frequencies' })
export class ReminderFrequency extends Model<ReminderFrequency> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  title: string;

  @Column
  frequency: number;

  @Column
  isActive: boolean;
}
