const http = require('http');

// the http module has a createServer method
// takes 1 arg: callback
// the callback takes 2 args: req and res

const fs = require('fs');
const server = http.createServer((req, res) => {
    if(req.url === '/') {
        //the user wants the home page
        // res = our way of responding to the requester
        // http message :
            // 1. start-line - CHECK
            // 2. header (writeHead)
            // 3. body (write)
        
        // writeHead takes 2 args: status code and object for mime-type
        res.writeHead(200, {'content-type': 'text/html'});

        // res.write('<h1>home page</h1>');
        const homePageHTML = fs.readFileSync('node.html');
        res.write(homePageHTML);
        res.end();
    } else {
        res.writeHead(404, { 'content-type': 'text/html' });

        res.write(fs.readFileSync('404.html'));

        res.end();
    }
    
});

// createServer returns an object with a listen method
// listen takes 1 arg: port to listen
server.listen(3000)