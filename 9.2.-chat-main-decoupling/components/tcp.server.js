
import { Server } from 'socket.io';
import { EventManager } from './event-manager.js';

export const bindTCPServer = (server, config = {}) => {
    const io = new Server(server, config);

    io.on('connection', async (socket) => {

        socket.on('chat message', async (msg, clientOffset, _) => {
            
            EventManager.emit('MESSAGE_INSERT', {
                msg, clientOffset,
                callback: result => io.emit('chat message', msg, result.lastID)
            });
        });

        if (!socket.recovered) {

            EventManager.emit('MESSAGES_REQUEST', {
                id: socket.handshake.auth.serverOffset,
                callback: (_err, row) => {
                    console.log(row)
                    socket.emit('chat message', row.content, row.id);
                }
            });

        }
    });
}