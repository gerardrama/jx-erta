import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/User';
import { Status } from '../models/Status';
import { Department } from '../models/Department';
import { Priority } from '../models/Priority';
import { Task } from '../models/Task';
import { Project } from '../models/Project';
import {UserTasks} from "../models/UserTasks";
import {Role} from "../models/Role";
import { Comment } from '../models/Comment';
import {TaskActivity} from "../models/TaskActivity";

dotenv.config();

export const sequelize = new Sequelize({
  database: process.env.DB_DATABASE as string,
  dialect: 'postgres',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  models: [Role, User, Task, Priority, Status, Department, Project, UserTasks, Comment, TaskActivity]
});

export const testDbConnection = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        console.log("Database connection has been established successfully.");
      } catch (error) {
        console.error("Database Error:", error);
      }
  };
