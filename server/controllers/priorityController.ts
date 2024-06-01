import { Priority } from "../models/Priority";

export const createPriority = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        const newPriority = await Priority.create({ name });

        return res.status(201).json(newPriority);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while creating the priority' });
    }
};

export const deletePriority = async (req, res) => {
    const { id } = req.params;

    try {
        const priority = await Priority.findByPk(id);
        if (!priority) {
            return res.status(204).json({ message: 'Priority not found' });
        }

        await priority.destroy();

        return res.status(200).json({ message: 'Priority deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while deleting the priority' });
    }
};

export const getPriorities = async (req, res) => {
    try {
        const priorities = await Priority.findAll();
        if (!priorities || priorities.length === 0) {
            return res.status(204).send();
        }
        return res.status(200).json(priorities);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while fetching priorities' });
    }
};