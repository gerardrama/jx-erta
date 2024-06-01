import { Department } from "../models/Department";

export const createDepartment = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        const newDepartment = await Department.create({ name });

        return res.status(201).json(newDepartment);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while creating the department' });
    }
};

export const updateDepartment = async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;

    try {
        const department = await Department.findByPk(id);
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }

        await department.update({ name });

        return res.status(200).json(department);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while updating the department' });
    }
};

export const deleteDepartment = async (req, res) => {
    const id = req.params.id;

    try {
        const department = await Department.findByPk(id);
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }

        await department.destroy();

        return res.status(200).json({ message: 'Department deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while deleting the department' });
    }
};

export const findDepartment = async (req, res) => {
    try {
        const department = await Department.findAll();
        if (!department) {
            return res.status(204).json({ message: 'Department not found' });
        }

        return res.status(200).json(department);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while fetching the department' });
    }
};
