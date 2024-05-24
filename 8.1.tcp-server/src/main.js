console.log("TCP Server");

const PORT = process.env.PORT || 3737;
const net = require('net');

const fileStream = require('fs').createWriteStream('data.save', { flags: 'a+' })

const server = net.createServer( socket => {

    socket.on('data', data => {
        console.log(data.toString())
        fileStream.write(data)
    })

});

server.listen(PORT, '127.0.0.1', () => console.log(`TCP Server Started - 127.0.0.1:${PORT} `));