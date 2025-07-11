import express, { urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { app } from './lib/soket.js';

// const app = express();

app.use(express.json({
    limit: "16kb"
}))
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))
app.use(cookieParser())
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "DELETE", "PUT"],
    }
))


// all the routing done here

import authrouter from './routes/auth.routes.js';

import messageroute from './routes/message.route.js';
app.use('/api/auth', authrouter)
app.use('/api/message', messageroute)
export default app