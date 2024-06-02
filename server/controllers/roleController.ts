import {User} from "../models/User";
import {Role} from "../models/Role";

export const getAllRoles = async(req, res) {
    try {
        const roles = await Role.findAll();

        if(!roles || roles.length === 0) {
            return res.sendStatus(204);
        }

        return res.status(200).json(roles);
    } catch (error) {
        return res.status(500).json({error: 'An error occurred while fetching roles'})
    }
}