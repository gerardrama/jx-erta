import { Column, DataType, Table } from "sequelize-typescript";
import { BaseModel } from "./BaseModel";

@Table
export class Department extends BaseModel {

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!: string;
}