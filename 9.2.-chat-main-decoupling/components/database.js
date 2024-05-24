import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { EventManager } from './event-manager.js';


let db;
export const init = async () => {
    db = await open({
        filename: 'data/chat.db',
        driver: sqlite3.Database
    });

    await db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_offset TEXT UNIQUE,
      content TEXT
    );
`);
}

export const retrieveMessages = async (id = 0, callback = () => false) => {
    if(!db) await init();
    return await db.each('SELECT id, content FROM messages WHERE id > ?',
        [id],
        callback
    )
}


export const insertMessage = async (msg, clientOffset, callback) => {
    try {
        return await db.run('INSERT INTO messages (content, client_offset) VALUES (?, ?)', msg, clientOffset);
    } catch (e) {
        if (e.errno === 19 /* SQLITE_CONSTRAINT */) {
            callback();
        } else {
            // nothing to do, just let the client retry
        }
        return {};
    }
}

EventManager.on('MESSAGE_INSERT', async ({ msg, clientOffset, callback }) => {
    const result = await insertMessage(msg, clientOffset, callback);
    callback(result)
});

EventManager.on('MESSAGES_REQUEST', async ({ id, callback }) => {
    console.log({ id, callback })
    await retrieveMessages(id, callback);
});
