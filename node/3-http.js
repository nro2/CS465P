'use strict';

var http = require('http'); // do not change this line

const server = http.createServer(function(req, res) {

   // http://localhost:8080/missing should return a status code 404 with 'your princess is in another castle' in plain text 
    if (req.url === '/missing') {
        res.writeHead(404, {
            'Content-Type': 'text/plain'
        });    
        res.end('your princess is in another castle')  
    }
    // http://localhost:8080/redirect should redirect the request to '/redirected' by using 302 as the status code
    else if (req.url === '/redirect') {
        res.writeHead(302, {
            'Location': '/redirected'
        });
        res.end();
    }
    else if (req.url === '/redirected') {
        res.writeHead(202, {
            'Content-Type': 'text/plain'
        });
        res.end('Redirected');
    }
    // http://localhost:8080/cache should return 'cache this resource' in plain text and set the cache max age to a day
    else if (req.url === '/cache') {
        res.setHeader('Cache-Control', 'max-age=86400')
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        }); 
        res.write('cache this resource');
        res.end();
    }
    // http://localhost:8080/cookie should return 'i gave you a cookie' in plain text and set 'hello=world' as a cookie
    else if (req.url === '/cookie') {
        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Set-Cookie': 'hello=world'
        }); 
        res.end('i gave you a cookie');
    }
    // http://localhost:8080/check should return 'yes' / 'no' in plain text depending on whether the browser has the 'hello' cookie
    else if (req.url === '/check') {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        var cookies = parseCookies(req); 
        if (cookies['hello']) {                 
            res.end('yes');
        }
        else {
            res.end('no');
        }
    }
    else {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        })
        res.end()
    }
});

function parseCookies (req) {
    var list = {},
        rc = req.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}

server.listen(process.env.PORT || 8080)