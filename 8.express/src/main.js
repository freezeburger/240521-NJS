console.log("Main");

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000


app.use((req, res, next) => {
    console.log(req.url);
    res.setHeader('X-Powered', 'Orsys-Team')
    // console.log(res.getHeaders())
    next()
})


app.use(express.static('www'))
app.use('/api', require('./routers/api.js'))

app.use((req, res, next) => {
    res.status(404).send({ message: 'Route' + req.url + ' Not found.' });
})

/* 

const http2 = require('http2');
const fs = require('fs');

const options = {
    key: require('fs').readFileSync("./server.key"),
    cert: require('fs').readFileSync("./server.crt")
};

const server = http2.createSecureServer(options, app)

 */

app.listen(PORT, () => {
    console.log(`Example app listening on port http://127.0.0.1:${PORT}`)
})

/* import('./services/db.service.mjs').then( ({DBService}) => {
    DBService.insert('Hello')
    DBService.retrieve()
})
 */