import { User } from '../models/User';
import bcrypt from 'bcrypt';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();

        if(!users || users.length === 0) {
            return res.sendStatus(204);
        }

        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({error: 'An error occurred while fetching users'})
    }
}

export const getUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findByPk(id);

        if(!user) {
            return res.status(204).json({message: 'User not found'});
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while fetching user'})
    }
}

export const updateUser = async (req, res) => {
    const id = req.params.id;

    const updatedUser: {email, password, fullName, roleId, dateOfBirth, personalId, address, departmentId} = req.body

    try {
        const user = await User.findByPk(id);

        if(!user) {
            return res.status(204).json({message: 'User not found'})
        }

        if(updatedUser.password) {
            updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
        }

        await user.update({
            ...updatedUser,
            passHash: updatedUser.password
        });

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while updating the user'})
    }
}

export const deleteUser = async(req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findByPk(id);

        if(!user) {
            return res.status(204).json({ message: 'User not found'});
        }

        await user.destroy();

        return res.status(200).json({message: 'User deleted successfully'});
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while deleting the user'})
    }
}