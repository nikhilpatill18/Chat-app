import express from 'express';
import { login, logout, signup, updateprofile, authuser } from '../controller/auth.controller.js';
import { verifyjwt } from '../middleware/Auth.middleware.js';

const authrouter = express.Router()

authrouter.route('/signup').post(signup)
authrouter.route('/login').post(login)
authrouter.route('/logout').get(verifyjwt, logout)
authrouter.route('/update-profile').put(verifyjwt, updateprofile)

authrouter.route('/check').get(verifyjwt, authuser)

export default authrouter