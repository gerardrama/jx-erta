import express from "express";
import { createProject, deleteProject, getAllProjects, getProject, updateProject } from "../controllers/projectController";

export const projectRoute = express.Router();

projectRoute.route('/projects')
    .get(getAllProjects);

projectRoute.route('/project/:id')
    .get(getProject);

projectRoute.route('/project')
    .post(createProject);

projectRoute.route('/project/:id')
    .put(updateProject);

projectRoute.route('/project/:id')
    .delete(deleteProject);
