import { Table } from "sequelize-typescript";
import { BaseModel } from "./BaseModel";

@Table
export class User extends BaseModel<User> {
    
}