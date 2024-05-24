
// router http
import express from 'express';
// creation http server
import { createServer } from 'node:http';
// url decoding
import { fileURLToPath } from 'node:url';
// path manipulation
import { dirname, join } from 'node:path';
// class Server from library socket.io https://socket.io/
import { Server } from 'socket.io';
// bdd https://github.com/TryGhost/node-sqlite3
import sqlite3 from 'sqlite3';
// https://github.com/kriasoft/node-sqlite#readme
import { open } from 'sqlite';
// ng process possible in parallell
import { availableParallelism } from 'node:os';
// gestion process
import cluster from 'node:cluster';
// https://github.com/socketio/socket.io-cluster-adapter#readme
import { createAdapter, setupPrimary } from '@socket.io/cluster-adapter';


// Determine si le process courant est le principal
if (cluster.isPrimary) {
  // On recupere le nb de cpu pour pouvoir instancié des process parallèle (parallelisme)
  const numCPUs = availableParallelism();

  console.log(process.pid)

  for (let i = 0; i < numCPUs; i++) {
    // Création de process enfant
    cluster.fork({
      PORT: 3000 + i
    });
  }

  // configure la relation entre les process
  setupPrimary();

} else {
  // ouvre une connexion asynchrone à la bdd
  const db = await open({
    filename: 'chat.db',
    driver: sqlite3.Database
  });


  // excute une requete de creation de table si indxistatnt
  await db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_offset TEXT UNIQUE,
      content TEXT
    );
  `);

  // initialise un route express
  const app = express();

  // associe le router express a un serveur http
  const server = createServer(app);

  // crée un serveur TCP
  const io = new Server(server, {
    connectionStateRecovery: {},
    adapter: createAdapter()
  });

  // recupérer le nom de repertoire ( du au fait des ESM modules )
  const __dirname = dirname(fileURLToPath(import.meta.url));

  // Configure une route /
  app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
  });

  // Ecoute les connexion entrantes sur le serveur tcp
  io.on('connection', async (socket) => {
    
    // Ecoute le message sur une connexion
    socket.on('chat message', async (msg, clientOffset, callback) => {
      
      let result;
      try {
        // Execution d'une requete d'insertion
        result = await db.run('INSERT INTO messages (content, client_offset) VALUES (?, ?)', msg, clientOffset);
      } catch (e) {
        if (e.errno === 19 /* SQLITE_CONSTRAINT */ ) {
          callback();
        } else {
          // nothing to do, just let the client retry
        }
        return;
      }
      // Emission d'un event de retour
      io.emit('chat message', msg, result.lastID);
      callback();
    });

    // Gestion de la récupération de connexion
    if (!socket.recovered) {
      try {
        // Recupération des messages manqués
        await db.each('SELECT id, content FROM messages WHERE id > ?',
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

  
  const port = process.env.PORT;

  server.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
  });
}

/**
 * 
 * 1.HTTP Server
 * 
 * 2.DRM Realtion DB
 * 
 * 3.TCP Server
 * 
 * Gestion Cluster (Eventuellement)
 * 
 */
