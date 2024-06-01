import express from "express";
import { addMessage, showTicketMessage, updateMessage } from "../controllers/messageController";

export const messageRoutes = express.Router();

messageRoutes.route('/message')
    .post(addMessage);

messageRoutes.route('/message')
    .put(updateMessage);

messageRoutes.route('/message')
    .put(showTicketMessage);    