
import { Server } from 'socket.io';
import { insertMessage, retrieveMessages } from './database.js';

export const bindTCPServer = (server, config = {}) => {
    const io = new Server(server, config );

    io.on('connection', async (socket) => {
        socket.on('chat message', async (msg, clientOffset, callback) => {
            const result = await insertMessage(msg, clientOffset, callback);
            io.emit('chat message', msg, result.lastID);
            callback();
        });

        if (!socket.recovered) {
            try {
                await retrieveMessages(
                    [socket.handshake.auth.serverOffset || 0],
                    (_err, row) => {
                        socket.emit('chat message', row.content, row.id);
                    }
                )
            } catch (e) {
                // something went wrong
            }
        }
    });
}