import {Column, ForeignKey, PrimaryKey, Table} from "sequelize-typescript";
import {BaseModel} from "./BaseModel";
import {User} from "./User";
import {Task} from "./Task";

@Table
export class UserTasks extends BaseModel {
    @ForeignKey(() => User)
    @PrimaryKey
    @Column
    userId: number

    @ForeignKey(() => Task)
    @PrimaryKey
    @Column
    taskId: number
}