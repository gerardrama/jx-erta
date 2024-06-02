import { BaseModel } from "./BaseModel";
import {BelongsTo, Column, DataType, ForeignKey, Table} from "sequelize-typescript";
import {User} from "./User";
import {Task} from "./Task";

@Table
export class TaskActivity extends BaseModel {
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER
    })
    editorId!: number;

    @ForeignKey(() => Task)
    @Column({
        type: DataType.INTEGER,
        onDelete: 'cascade'
    })
    taskId!: number;

    @Column({
        type: DataType.STRING
    })
    field: string;

    @Column({
        type: DataType.STRING
    })
    activity: string;

    @Column({
        type: DataType.STRING
    })
    oldValue: string;

    @Column({
        type: DataType.STRING
    })
    newValue: string;

    @BelongsTo(() => User)
    editor: User;

    @BelongsTo(() => Task)
    task: Task;
}