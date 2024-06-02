import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { Role } from '../models/Role';

interface DecodedToken {
    UserInfo: {
        email: string;
    }
}

export const getCurrentUser = async (req: Request): Promise<User | null> => {
    const authHeader = req.headers.authorization || req.headers.Authorization as string;

    if (!authHeader?.startsWith('Bearer ')) {
        console.log('Authorization header missing or malformed');
        return null;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as DecodedToken;
        console.log('Decoded token:', decoded);

        const user = await User.findOne({
            where: {
                email: decoded.UserInfo.email,
            },
            include: [Role],
        });

        if (!user) {
            console.log('User not found');
            return null;
        }

        return user;
    } catch (err) {
        console.error('Error verifying token or fetching user:', err);
        return null;
    }
};
