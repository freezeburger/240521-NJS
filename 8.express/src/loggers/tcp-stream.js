
const tcpStream = new (require('net').Socket)()
tcpStream.connect({port:3737, host:'127.0.0.1'})

module.exports = tcpStream;