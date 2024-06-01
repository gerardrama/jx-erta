import express from "express";
import { createTask, deleteTask, getAllTasks, getTask, updateTask } from "../controllers/taskController";

export const taskRoute = express.Router();

taskRoute.route('/tasks')
    .get(getAllTasks);

taskRoute.route('/tasks/:id')
    .get(getTask);

taskRoute.route('/tasks')
    .post(createTask);

taskRoute.route('/tasks/:id')
    .put(updateTask);

taskRoute.route('/tasks/:id')
    .delete(deleteTask);