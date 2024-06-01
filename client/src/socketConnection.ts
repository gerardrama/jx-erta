import * as io from 'socket.io-client';
export const socket = io.connect("http://localhost:4000", { transports : ['websocket'] });

export const emitTaskDrag = (task) => {
    // TODO: BASIC WEB SOCKET IMPLEMENTATION, CHANGE/REMOVE LATER
    socket.emit('TASK_DRAG', task);
}