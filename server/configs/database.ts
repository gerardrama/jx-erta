import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/User';

dotenv.config();

export const sequelize = new Sequelize({
  database: process.env.DB_DATABASE as string,
  dialect: 'postgres',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  models: [User]
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
