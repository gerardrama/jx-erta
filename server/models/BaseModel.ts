import { Model, Column, DataType, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement } from "sequelize-typescript";

export class BaseModel<T extends {}> extends Model<T> {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
    })
    id!: number;

    @CreatedAt
    @Column({
        type: DataType.DATE,
    })
    createdAt!: Date;

    @UpdatedAt
    @Column({
        type: DataType.DATE,
    })
    updatedAt!: Date;
}
