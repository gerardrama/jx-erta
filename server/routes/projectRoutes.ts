import express from "express";
import { createProject, deleteProject, getAllProjects, getProject, updateProject } from "../controllers/projectController";

export const projectRoute = express.Router();

projectRoute.route('/projects')
    .get(getAllProjects);

projectRoute.route('/projects/:id')
    .get(getProject);

projectRoute.route('/projects')
    .post(createProject);

projectRoute.route('/projects/:id')
    .put(updateProject);

projectRoute.route('/projects/:id')
    .delete(deleteProject);
