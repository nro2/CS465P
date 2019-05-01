'use strict';

var http = require('http'); // do not change this line

var server = http.createServer(function(req, res) {
    var cookies = parseCookies(req);
    if (cookies['ident']) {
        var temp = cookies['ident']                
        res.writeHead(200, {
            'Content-Type':'text/plain',
            'Set-Cookie': "ident=" + req.url
        });
        res.end('last time you visited "' + temp + '"');
    }
    else {
        res.writeHead(200, {
            'Content-Type':'text/plain',
            'Set-Cookie': "ident=" + req.url
        });
        res.end('you must be new');
    }  
});
 
server.listen(process.env.PORT || 8080);

function parseCookies (req) {
    var list = {},
        rc = req.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });
    return list;
}
// http://localhost:8080/hello should return 'you must be new' in plain text and set an ident cookie

// http://localhost:8080/test should return 'last time you visited "/hello"' in plain text

// http://localhost:8080/world should return 'last time you visited "/test"' in plain text

// [now sending requests from a different browser]

// http://localhost:8080/lorem should return 'you must be new' in plain text and set an ident cookie

// http://localhost:8080/moshimoshi should return 'last time you visited "/lorem"' in plain text

// http://localhost:8080/ipsum should return 'last time you visited "/moshimoshi"' in plain text

// [sending requests from the original browser again]

// http://localhost:8080/again should return 'last time you visited "/world"' in plain text

// [the server restarts and looses all cookies]

// http://localhost:8080/servus should return 'you must be new' in plain text and set an ident cookie