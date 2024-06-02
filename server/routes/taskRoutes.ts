import express from "express";
import { createTask, deleteTask, getAllTasks, getTask, getUserTasks, updateTask } from "../controllers/taskController";
import {taskActivityAudit} from "../middleware/taskActivityAudit";

export const taskRoute = express.Router();

taskRoute.route('/tasks')
    .get(getAllTasks);

taskRoute.route('/tasks/:id')
    .get(getTask);

taskRoute.route('/tasks')
    .post(createTask);

taskRoute.route('/tasks/:id')
    .put(updateTask, taskActivityAudit);

taskRoute.route('/tasks/:id')
    .delete(deleteTask, taskActivityAudit);

taskRoute.route('/task/:userId')
    .get(getUserTasks);