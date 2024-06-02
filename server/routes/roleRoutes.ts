import express from "express";
import {getAllRoles} from "../controllers/roleController";

export const roleRoutes = express.Router();

roleRoutes.route('/roles')
    .get(getAllRoles);