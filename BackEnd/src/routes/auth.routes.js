import express from 'express';
import { login, logout, signup } from '../controller/auth.controller.js';

const authrouter = express.Router()

authrouter.route('/signup').post(signup)
authrouter.route('/login').post(login)
authrouter.route('/logout').get(logout)

export default authrouter