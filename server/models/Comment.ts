import { BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import { BaseModel } from "./BaseModel";
import { User } from "./User";
import { Task } from "./Task";

@Table
export class Comment extends BaseModel {
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    userId!: number;

    @ForeignKey(() => Task)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    taskId!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    message!: string;

    @BelongsTo(() => Task)
    task: Task;

    @BelongsTo(() => User)
    user!: User;
}