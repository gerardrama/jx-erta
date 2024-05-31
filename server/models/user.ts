import { Table, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { Department } from './Department'; // Ensure you have a Department model defined
import { BaseModel } from './BaseModel';

@Table
export class User extends BaseModel<User> {

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  passHash!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fullName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  role!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  dateOfBirth!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  personalId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address!: string;

  @ForeignKey(() => Department)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  departmentId!: number;
}