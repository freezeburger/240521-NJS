import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

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