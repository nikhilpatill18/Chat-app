import express, { urlencoded } from 'express';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json({
    limit: "16kb"
}))
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))
app.use(cookieParser())


// all the routing done here

import authrouter from './routes/auth.routes.js';

import messageroute from './routes/message.route.js';
app.use('/api/auth', authrouter)
app.use('/api/message', messageroute)
export default app