console.log("Main");

const PORT = process.env.PORT;
if (!PORT) {
    console.error('No PORT in ENV');
    process.exit(1);
}

require('http').createServer((req, res) => {

    console.log(req)

    res.writeHead(200)

    res.write('Hello World')
    res.end()

}).listen(PORT, () => console.log(`Server started http://127.0.0.1:${PORT}`))