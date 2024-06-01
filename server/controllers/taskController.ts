import { Department } from "../models/Department";
import { Priority } from "../models/Priority";
import { Project } from "../models/Project";
import { Status } from "../models/Status";
import { Task } from "../models/Task";
import { User } from "../models/User";
import { UserTasks } from "../models/UserTasks";

export const getAllTasks = async (req, res) => {
    try {
        const { projectId, statusId, priorityId, departmentId } = req.query;

        let where: any = {};

        if (projectId) {
            where.projectId = projectId;
        }
        if (statusId) {
            where.statusId = statusId;
        }
        if (priorityId) {
            where.priorityId = priorityId;
        }
        if (departmentId) {
            where.departmentId = departmentId;
        }

        const tasks = await Task.findAll({
            where,
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
        const task: { projectId, title, description, statusId, priorityId, departmentId, parentId, deadline, userIds } = req.body;
    
        if (!req.body) {
            return res.status(400).json({ message: 'Request body is empty' });
        }
        
        const newTask = await Task.create({
           ...task
        });

        if (task.userIds.length !== 0) {
            task.userIds.forEach(async userId => {
                await UserTasks.create({
                    userId: userId,
                    taskId: newTask.id
                });
            });
        }

        return res.status(201).json(newTask);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while creating the task' + error });
    }
};

export const updateTask = async (req, res) => {
    const id = req.params.id;
    const updatedTask: { projectId, title, description, statusId, priorityId, departmentId, parentId, deadline, userIds: number[] } = req.body;
    
    try {
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(204).json({ message: 'Task not found' });
        }

        await task.update({
            ...updatedTask
        });

        if (updatedTask.userIds.length !== 0) {
            const currentUserIds = (await UserTasks.findAll({ where: { taskId: id } })).map(userTask => userTask.id);

            const usersToAdd = currentUserIds.filter(userId => !currentUserIds.includes(userId));
            const usersToRemove = currentUserIds.filter(userId => !currentUserIds.includes(userId));

            await Promise.all(usersToAdd.map(async userId => {
                await UserTasks.create({ userId, taskId: id });
            }));

            await Promise.all(usersToRemove.map(async userId => {
                await UserTasks.destroy({ where: { userId, taskId: id } });
            }));

            const updatedTask = await Task.findByPk(id, {
                include: [User]
            });
        }
        
        return res.status(200).json(updatedTask);
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