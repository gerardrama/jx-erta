import { AllowNull, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
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

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
    })
    clientId!: number;

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

}