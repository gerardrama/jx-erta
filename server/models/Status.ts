import { AutoIncrement, Column, DataType, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";

@Table
export class Status extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!: string;
}