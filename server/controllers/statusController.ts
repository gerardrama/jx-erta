import { Status } from "../models/Status";

export const createStatus = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        const newStatus = await Status.create({ name });

        return res.status(201).json(newStatus);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while creating the status' });
    }
};

export const deleteStatus = async (req, res) => {
    const id = req.params.id;

    try {
        const status = await Status.findByPk(id);
        if (!status) {
            return res.status(204).json({ message: 'Status not found' });
        }

        await status.destroy();

        return res.status(200).json({ message: 'Status deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while deleting the status' });
    }
};

export const getStatus = async (req, res) => {
    try {
        const status = await Status.findAll();
        if (!status) {
            return res.status(204).json({ message: 'Status not found' });
        }

        return res.status(200).json(status);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while fetching the status' });
    }
};