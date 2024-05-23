console.log("Main");

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000


app.use((req, res, next) => {
    console.log(req.url);
    res.setHeader('X-Powered', 'Orsys-Team')
    console.log(res.getHeaders())
    next()
})

/* app.get('/', (req, res) => {
    res.send('Hello World!')
}) */

app.use(express.static('www'))
app.use('/api', require('./routers/api.js') )

app.use((req, res, next) => {
    res.status(404).send({ message: 'Route' + req.url + ' Not found.' });
})


app.listen( PORT, () => {
    console.log(`Example app listening on port http://127.0.0.1:${PORT}`)
})

/* import('./services/db.service.mjs').then( ({DBService}) => {
    DBService.insert('Hello')
    DBService.retrieve()
})
 */