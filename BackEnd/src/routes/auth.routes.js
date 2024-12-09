import express from 'express';
import { login, logout, signup, updateprofile } from '../controller/auth.controller.js';
import { verifyjwt } from '../middleware/Auth.middleware.js';

const authrouter = express.Router()

authrouter.route('/signup').post(signup)
authrouter.route('/login').get(login)
authrouter.route('/logout').get(verifyjwt, logout)
authrouter.route('.update-profile').put(verifyjwt, updateprofile)

export default authrouter