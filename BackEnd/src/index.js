import express from 'express';
import dotenv from "dotenv"
import authRoutes from './routes/auth.routes.js '
import { connectdb } from './lib/db.js';
import app from './app.js';
dotenv.config(
    {
        path: '.env'
    }
);
const port = process.env.PORT || 3000
connectdb().then(() => {
    app.listen(port, () => {
        console.log("listening on port", port)
    });

})