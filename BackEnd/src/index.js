
import dotenv from "dotenv"
import { connectdb } from './lib/db.js';
import app from './app.js';

import { server, io } from "./lib/soket.js";
dotenv.config(
    {
        path: '.env'
    }
);
const port = process.env.PORT || 3000
connectdb().then(() => {
    server.listen(port, () => {
        console.log("listening on port", port)
    });

})