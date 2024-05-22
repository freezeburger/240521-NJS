console.log("Main");


const PORT = process.env.PORT || 3000;

require('http').createServer((req, res) => {

    
    res.setHeader('Content-Type', 'text/plain')
    res.writeHead(200)

    switch (req.url) {
        case '/':
            res.end('Home')
            break;
        case '/about':
            res.end('About')
            break;
        case '/contact':
            res.end('Contact')
            break;
        default:
            res.end('')
            break;
    }


}).listen(PORT, () => console.log(`Server started http://127.0.0.1:${PORT}`))