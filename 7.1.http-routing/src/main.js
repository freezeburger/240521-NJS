console.log("Main");


const PORT = process.env.PORT || 3000;

require('http').createServer((req, res) => {

    
    res.setHeader('Content-Type', 'text/html')
    res.writeHead(200)


    switch (req.url) {
        case '/':
            // res.write('Home')
            // require('fs').createReadStream('./www/index.html').pipe(res)
            require('fs/promises').readFile('./www/index.html').then( content => res.end(content) )
            break;
        case '/about':
            //res.write('About')
            require('fs').createReadStream('./www/about.html').pipe(res)
            break;
        case '/contact':
            //res.write('Contact')
            // require('fs').createReadStream('./www/contact.html').pipe(res)
            require('fs').readFile('./www/contact.html', (err,content) => res.end(content) )
            break;
        default:
            res.end('')
            break;
    }

    //res.end('')


}).listen(PORT, () => console.log(`Server started http://127.0.0.1:${PORT}`))