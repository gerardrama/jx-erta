import express from "express";
import { createStatus, deleteStatus, getStatus } from "../controllers/statusController";

export const statusRoute = express.Router();

statusRoute.route('/status')
    .get(getStatus);

statusRoute.route('/status')
    .post(createStatus);

statusRoute.route("/status/:id")
    .delete(deleteStatus);