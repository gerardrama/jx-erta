import express from "express";
import { createPriority, deletePriority, getPriorities } from "../controllers/priorityController";

export const priorityRoute = express.Router();

priorityRoute.route('/priority')
    .get(getPriorities);

priorityRoute.route('/priority')
    .post(createPriority);

priorityRoute.route('/priority/:id')
    .delete(deletePriority);