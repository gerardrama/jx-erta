import express from 'express';
import {handleLogin} from "../controllers/loginController";
import {handleRegistration} from "../controllers/registrationController";
import {handleRefreshToken} from "../controllers/refreshTokenController";
import {handleLogout} from "../controllers/logoutController";

export const authRoute = express.Router();

authRoute.route('/login')
    .get(handleLogin);

authRoute.route('/register')
    .post(handleRegistration);

authRoute.route('/refreshToken')
    .get(handleRefreshToken);

authRoute.route('/logout')
    .get(handleLogout);