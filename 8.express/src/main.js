console.log("Main");

const appLogger =  require('./loggers/winston.js')('Main Router');
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;

app
    .use(require('./middlewares/default-headers.middleware.js'))
    .use(require('./loggers/morgan.js'))
    .use(express.static('www'))
    .use('/api', require('./routers/api.js'))
    .use(require('./middlewares/404.middleware.js'));

app
    .listen(PORT, () => {
        const msg = `Example app listening on port http://127.0.0.1:${PORT}`
        appLogger.log('info', msg );
    });


   

/* 
const http2 = require('http2');
const fs = require('fs');

const options = {
    key: require('fs').readFileSync("./server.key"),
    cert: require('fs').readFileSync("./server.crt")
};

const server = http2.createSecureServer(options, app)
*/

/* 
import('./services/db.service.mjs').then( ({DBService}) => {
    DBService.insert('Hello')
    DBService.retrieve()
})
 */