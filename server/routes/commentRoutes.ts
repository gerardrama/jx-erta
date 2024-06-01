import express from "express";
import {
    addComment,
    showTicketComments,
    updateComment,
} from "../controllers/commentController";

export const commentRoutes = express.Router();

commentRoutes.route('/message')
    .post(addComment);

commentRoutes.route('/message')
    .put(updateComment);

commentRoutes.route('/message')
    .put(showTicketComments);