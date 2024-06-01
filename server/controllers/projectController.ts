import { Project } from "../models/Project"
import { Status } from "../models/Status";
import { User } from "../models/User";

export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.findAll({
            include: [Status, {
                model: User,
                through: { attributes: []}
            }]
        });
        console.log(projects);
        if (!projects || projects.length === 0) {
            return res.status(204).send();
        }

        return res.status(200).json(projects);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while fetching projects' });
    }
}

export const getProject = async (req, res) => {
    const id  = req.params.id;

    try {
        const project = await Project.findByPk(id);
        if (!project) {
            return res.status(204).json({message: 'Project not found!'});
        }

        return res.status(200).json(project);
    } catch (error) {
        return res.status(500).json({error: 'An error occured while fetching the project' });
    }
}

export const createProject = async (req, res) => {
    try {
        const project: { title, description, clientId, statusId, deadline } = req.body;

        if (!req) {
            return res.status(400).json({ message: 'Request is empty' });
        }

        const newProject = await Project.create({
            ...project
        });

        return res.status(201).json(newProject);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while creating the project' + error });
    }
}

export const updateProject = async (req, res) => {
    const  id  = req.params.id;
    const updatedProject: { title, description, clientId, statusId, deadline } = req.body;

    try {
        const project = await Project.findByPk(id);
        if (!project) {
            return res.status(204).json({ message: 'Project not found' });
        }

        await project.update({
            ...updatedProject
        });

        return res.status(200).json(project);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while updating the project' });
    }
}

export const deleteProject = async(req, res) => {
    const id  = req.params.id;

    try {
        const project = await Project.findByPk(id);
        if (!project) {
            return res.status(204).json({ message: 'Project not found' });
        }

        await project.destroy();

        return res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while deleting the project' });
    }
}