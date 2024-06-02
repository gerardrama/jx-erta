import express from 'express';
import {handleLogin} from "../controllers/auth/loginController";
import {handleRegistration} from "../controllers/auth/registrationController";
import {handleRefreshToken} from "../controllers/auth/refreshTokenController";
import {handleLogout} from "../controllers/auth/logoutController";

export const authRoute = express.Router();

authRoute.route('/login')
    .post(handleLogin);

authRoute.route('/register')
    .post(handleRegistration);

authRoute.route('/refreshToken')
    .get(handleRefreshToken);

authRoute.route('/logout')
    .get(handleLogout);