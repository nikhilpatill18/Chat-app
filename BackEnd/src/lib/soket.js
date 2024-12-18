import { Server } from 'socket.io'
// import app from '../app.js'
import http from 'http'
import express from 'express'

//created server
const app = express();

const server = http.createServer(app)

const io = new Server(server, {
    cors: ["http://localhost:5173"]
})

//open the connection

export function getreciverid(userId) {
    return userSocketMap[userId]
}

const userSocketMap = {}

io.on("connection", (socket) => {
    // console.log("a user connected", socket.id)

    const userId = socket.handshake.query.userId
    // console.log(userId)
    if (userId) userSocketMap[userId] = socket.id
    io.emit("getonlineusers", Object.keys(userSocketMap))



    socket.on("disconnect", () => {
        // console.log("user is disconnected", socket.id)
        delete userSocketMap[userId]
        io.emit("getonlineusers", Object.keys(userSocketMap))
    })
})

export { io, server, app }
