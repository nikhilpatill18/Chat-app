import express from 'express';
import { verifyjwt } from '../middleware/Auth.middleware.js';
import { getmessage, sidebaruser, sendmessage } from '../controller/message.controller.js'

const messageroute = express.Router();

messageroute.route('/users').get(verifyjwt, sidebaruser)
messageroute.route('/:id').get(verifyjwt, getmessage)
messageroute.route('/send/:id').get(verifyjwt, sendmessage)

export default messageroute;