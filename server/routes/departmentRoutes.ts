import express from "express";
import { createDepartment, deleteDepartment, findDepartment, updateDepartment } from "../controllers/departmentController";

export const departmentRoutes = express.Router();

departmentRoutes.route('/departments')
    .get(findDepartment);

departmentRoutes.route('/departments/:id')
    .put(updateDepartment);

departmentRoutes.route('/departments/:id')
    .delete(deleteDepartment);

departmentRoutes.route('/departments')
    .post(createDepartment);