import express from "express";
import { createTask, deleteTask, getAllTasks, getTask, updateTask } from "../controllers/taskController";

export const taskRoute = express.Router();

taskRoute.route('/tasks')
    .get(getAllTasks);

taskRoute.route('/task/:id')
    .get(getTask);

taskRoute.route('/task')
    .post(createTask);

taskRoute.route('/task/:id')
    .put(updateTask);

taskRoute.route('/task/:id')
    .delete(deleteTask);