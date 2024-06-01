import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasOne, Table} from "sequelize-typescript";
import { BaseModel } from "./BaseModel";
import { Status } from "./Status";
import { Project } from "./Project";
import { Priority } from "./Priority";
import { Department } from "./Department";
import {User} from "./User";
import {UserTasks} from "./UserTasks";

@Table
export class Task extends BaseModel {

    @ForeignKey(() => Project)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    projectId!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    title!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    description!: string;

    @ForeignKey(() => Status)
    @Column({
    type: DataType.INTEGER,
    allowNull: false,
    })
    statusId!: number;

    @ForeignKey(() => Priority)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    priorityId!: number;

    @ForeignKey(() => Department)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    departmentId!: number;

    @ForeignKey(() => Task)
    @Column({
        type: DataType.INTEGER
    })
    parentId!: number | null;

    @Column({
        type: DataType.DATE,
    })
    deadline!: Date;

    @BelongsTo(() => Department)
    department: Department;

    @BelongsTo(() => Task)
    parent: Task;

    @BelongsTo(() => Status)
    status: Status;

    @BelongsTo(() => Project)
    project: Project;

    @BelongsTo(() => Priority)
    priority: Priority;

    @BelongsToMany(() => User, {
        through: {model: () => UserTasks},
        foreignKey: 'taskId'
    })
    users: User[]
}