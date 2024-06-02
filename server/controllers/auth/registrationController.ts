import bcrypt from 'bcrypt';
import {User} from "../../models/User";
import nodemailer from 'nodemailer';

interface RegistrationRequest {
    email,
    fullName,
    roleId,
    dateOfBirth,
    personalId,
    address,
    departmentId
}

const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
    }
});
async function sendEmail(password: string) {
    const info = await transporter.sendMail({
        from: 'garrett.wilderman@ethereal.email',
        to: "gerardrama10@gmail.com",
        subject: "New password",
        text: `Your newly created password is: ${password}`
    });
}

export const handleRegistration = async (req, res) => {
    const registrationRequest: RegistrationRequest = req.body;
    if (!registrationRequest.email)
        return res
            .status(400)
            .json({ 'message': 'Email is required.' });

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
        const password = Math.random().toString(36).toUpperCase().slice(-10);
        const hashedPwd = await bcrypt.hash(password, 10);

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
        await sendEmail(password);
        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err });
    }
}