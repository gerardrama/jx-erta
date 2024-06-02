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
        allowNull: false,
        onDelete: 'CASCADE'
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
        onDelete: 'CASCADE'
    })
    statusId!: number;

    @ForeignKey(() => Priority)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE'
    })
    priorityId!: number;

    @ForeignKey(() => Department)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE'
    })
    departmentId!: number;

    @ForeignKey(() => Task)
    @Column({
        type: DataType.INTEGER,
        onDelete: 'CASCADE'
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
        foreignKey: 'taskId',
        onDelete: 'cascade'
    })
    users: User[]
}