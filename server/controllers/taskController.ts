import { Department } from "../models/Department";
import { Priority } from "../models/Priority";
import { Project } from "../models/Project";
import { Status } from "../models/Status";
import { Task } from "../models/Task";
import { User } from "../models/User";

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({
            include: [Project, Status, Priority, Department, {
                model: User,
                through: { attributes: [] } 
            }]
        });
        if (!tasks || tasks.length === 0) {
            return res.status(204).send();
        }
        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while fetching tasks' });
    }
};

export const getTask = async (req, res) => {
    const id = req.params.id;
    try {
        const task = await Task.findByPk(id, {
            include: [Project, Status, Priority, Department, {
                model: User,
                through: { attributes: [] } 
            }]
        });
        if (!task) {
            return res.status(204).json({ message: 'Task not found' });
        }
        return res.status(200).json(task);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while fetching the task' });
    }
};

export const createTask = async (req, res) => {
    try {
        const task: { projectId, title, description, statusId, priorityId, departmentId, parentId, deadline } = req.body;
    
        if (!req.body) {
            return res.status(400).json({ message: 'Request body is empty' });
        }
        
        const newTask = await Task.create({
            task
        });

        return res.status(201).json(newTask);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while creating the task' });
    }
};

export const updateTask = async (req, res) => {
    const id = req.params.id;
    const updatedTask: { projectId, title, description, statusId, priorityId, departmentId, parentId, deadline } = req.body;
    
    try {
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(204).json({ message: 'Task not found' });
        }

        await task.update({
            ...updatedTask
        });
        
        return res.status(200).json(task);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while updating the task' });
    }
};

export const deleteTask = async (req, res) => {
    const id = req.params.id;

    try {
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await task.destroy();

        return res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while deleting the task' });
    }
};

export const getUserTasks = async(req, res) => {
    const userId = req.param.id;

    try {
        const tasks = await Task.findAll({
            where: {
                userId: userId
            }
        });

        if (!tasks) {
            return res.status(204).json({ message: 'Tasks not found'});
        }

        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while fetching tasks' });
    }
}