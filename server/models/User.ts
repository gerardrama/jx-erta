import {Table, Column, DataType, ForeignKey, BelongsToMany, BelongsTo} from 'sequelize-typescript';
import { Department } from './Department';
import { BaseModel } from './BaseModel';
import {Task} from "./Task";
import {UserTasks} from "./UserTasks";
import {Role} from "./Role";

@Table
export class User extends BaseModel {

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

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  roleId!: number;

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

  @Column({
    type: DataType. STRING,
    allowNull: true
  })
  refreshToken!: string | null;

  @BelongsTo(() => Role)
  role!: Role;

  @BelongsTo(() => Department)
  department!: Department;

  @BelongsToMany(() => Task, {
    through: {model: () => UserTasks},
    foreignKey: 'userId'
  })
  tasks: Task[]
}