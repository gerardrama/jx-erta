import express from "express";
import {deleteUser, getAllUsers, getUser, updateUser} from "../controllers/userController";

export const userRoutes = express.Router();

userRoutes.route('/users')
    .get(getAllUsers);

userRoutes.route('/users/:id')
    .get(getUser);

userRoutes.route('/users/:id')
    .put(updateUser);

userRoutes.route('/users/:id')
    .delete(deleteUser);