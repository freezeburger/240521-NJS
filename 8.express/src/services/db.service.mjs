import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'node:path';
import { EventEmitter } from 'node:events'

let nextId = 1;

class DatabaseService /* extends EventEmitter */ {

    #database
    #PATH = './src/data/database.db';


    constructor() {
        //super()
       this.#init()
    }

    async #init() {
        
        this.#database = await open({
            filename: this.#PATH,
            driver: sqlite3.Database
        });

        await this.#database.exec(`
        CREATE TABLE IF NOT EXISTS messages (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          client_offset TEXT, 
          content TEXT
        );
      `);

    }

    async insert( text = '', clientOffset = nextId++ ) {
        
        if( !this.#database) await this.#init();

       /*  const query = await this.database.prepare('INSERT INTO messages (content, client_offset) VALUES (?, ?)');
        const result = query.run( text , clientOffset); */
        const result = await this.#database.run('INSERT INTO messages (content, client_offset) VALUES (?, ?)', text, clientOffset);
        console.log(result)
        return result;
    }

    async retrieve() {
        if( !this.#database) await this.#init();

        const result = []
        await this.#database.each('SELECT id, content FROM messages', [],
            (_err, row) => {
                result.push(row);
            }
        )
        console.log(result)
        return result;
    }

}

export const DBService = new DatabaseService()
export default DBService;