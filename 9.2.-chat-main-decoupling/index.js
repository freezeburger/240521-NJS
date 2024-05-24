

import { availableParallelism } from 'node:os';
import cluster from 'node:cluster';
import { createAdapter, setupPrimary as setupPrimaryProcess } from '@socket.io/cluster-adapter';
import { init as initDatabase } from './components/database.js';
import { server, start as startHttpServer } from './components/http.server.js';
import { bindTCPServer } from './components/tcp.server.js';
import { PORT } from './config.js';

setupCluster(

  async () => {
    await initDatabase();
    setupPrimaryProcess();
  },

  () => {

    bindTCPServer(server, {
      connectionStateRecovery: {},
      adapter: createAdapter()
    })
    startHttpServer()
  }
)


function setupCluster(primaryCallback, childCallback) {
  if (cluster.isPrimary) {

    const numCPUs = availableParallelism();

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork({
        PORT: PORT + i
      });
    }

    primaryCallback()

  } else {

    childCallback()
  }
}


