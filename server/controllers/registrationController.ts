import bcrypt from 'bcrypt';
import {User} from "../models/User";

interface RegistrationRequest {
    email,
    password,
    fullName,
    roleId,
    dateOfBirth,
    personalId,
    address,
    departmentId
}

export const handleRegistration = async (req, res) => {
    const registrationRequest: RegistrationRequest = req.body;
    if (!registrationRequest.email || !registrationRequest.password)
        return res
            .status(400)
            .json({ 'message': 'Email and password are required.' });

    const duplicate = await User.findOne(
        ({
            where: {
                email: registrationRequest.email
            }
        })
    );
    if (duplicate)
        return res
            .status(409)
            .json({
                status: res.status,
                message: 'User already exists'
            });
    try {
        const hashedPwd = await bcrypt.hash(registrationRequest.password, 10);

        const newUser = {
            email: registrationRequest.email,
            passHash: hashedPwd,
            fullName: registrationRequest.fullName,
            roleId: registrationRequest.roleId,
            address: registrationRequest.address,
            personalId: registrationRequest.personalId,
            departmentId: registrationRequest.departmentId,
            dateOfBirth: registrationRequest.dateOfBirth
        };
        const user = await User.create(newUser);
        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err });
    }
}