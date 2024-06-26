import {Server} from "socket.io";

export const socketServer = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", async (socket) => {
        console.log('CONNECTED TO SOCKET', socket.id);
        // TODO: BASIC WEB SOCKET IMPLEMENTATION, CHANGE/REMOVE LATER
        socket.on('task',(data) => {
            socket.emit('taskContent', data);
        })

        socket.on('TASK_DRAG', (data) => {
            console.log(data);
        })

        socket.on('SEND_COMMENT', (newComment) => {
            io.emit('UPDATE_COMMENT', newComment);
        })
    });
};