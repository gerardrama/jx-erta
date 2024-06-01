import { Comment } from "../models/Comment";

export const addMessage = async (req, res) => {
    const message: {ticketId, userId, message} = req.body;

    try {
        if (!message) {
            return res.status(400).json({message: 'Request body is empty!'})
        }

        const newMessage = await Comment.create({
            message
        });

        return res.status(201).json(newMessage);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while creating the task'})
    }
};

export const updateMessage = async (req, res) => {
    const message: {commentId, message} = req.body;

    try {
        const comment = await Comment.findByPk(message?.commentId);
        if (!message) {
            return res.status(204).json({message: 'No comment found!'})
        }

        await comment?.update({
            ...message
        });

        return res.status(200).json(comment);
    } catch (error) {
        return res.status(500).json({error: 'An error occurred while updating the task'})
    }
}

export const showTicketMessage = async (req, res) => {
    const taskId = req.param.id;

    try {
        const comments = await Comment.findAll({
            where: {
                taskId: taskId
            }
        });

        if (!comments) {
            return res.status(204).json({ message: 'Comments not found'});
        }

        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while fetching tasks' });
    }
}