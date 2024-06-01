import {User} from "../../models/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {Role} from "../../models/Role";

export const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password)
        return res
            .status(400)
            .json({
                status: res.statusCode,
                message: 'Email and Password required'
            })

    const foundUser = await User.findOne(
        ({
            where: {
                email: email
            },
            include: [Role],
        })
    );

    if(!foundUser)
        return res.sendStatus(401);

    const match = bcrypt.compare(password, foundUser.passHash);

    if(match) {
        const accessToken = jwt.sign(
            { 'UserInfo':
                {
                    'email': foundUser.email,
                    'role': foundUser.role.name
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION }
        );

        const refreshToken = jwt.sign(
            { 'email': foundUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION }
        );

        foundUser.refreshToken = refreshToken;
        await foundUser.save();

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 24 * 60 * 60 * 1000});
        res.json({
            accessToken: accessToken
        });
    } else {
        res.sendStatus(401);
    }
}