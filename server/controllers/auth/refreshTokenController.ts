import {User} from "../../models/User";
import jwt from 'jsonwebtoken';
import {Role} from "../../models/Role";
export const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;

    if(!cookies?.jwt)
        return res.status(401)
            .json({
                status: res.statusCode,
                message: 'Unauthorized'
            });

    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne(
        ({
            where: {
                refreshToken: refreshToken
            },
            include: [Role],
        })
    );

    if(!foundUser)
        return res.sendStatus(401);

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || foundUser.email !== decoded.email)
                return res.sendStatus(403);

            const accessToken = jwt.sign(
                { 'UserInfo':
                    {
                        'email': decoded.email,
                        'role': foundUser.role.name
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION }
            );

            res.json(
                { accessToken }
            );
        }
    )
}