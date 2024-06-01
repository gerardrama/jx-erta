import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import { BaseModel } from "./BaseModel";
import { User } from "./User";
import { Status } from "./Status";

@Table
export class Project extends BaseModel {
    
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    title!: string;

    @Column({
        type: DataType.STRING,
    })
    description!: string;

    @Column({
        type: DataType.STRING,
    })
    client!: string;

    @ForeignKey(() => Status)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    statusId!: number;

    @Column({
        type: DataType.DATE,
    })
    deadline!: Date;

    @BelongsTo(() => Status)
    status: Status;
}