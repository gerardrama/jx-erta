import { Column, DataType, NotNull, Table } from "sequelize-typescript";
import { BaseModel } from "./BaseModel";

@Table
export class Department extends BaseModel<Department> {

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!: string;
}