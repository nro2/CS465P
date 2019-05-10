'use strict';

var express = require('express'); // do not change this line

var server = express();

server.get('/missing', function(req, res) {
    res.status(200);
    res.write('your princess is in another castle');
    res.end();
});
server.get('/redirect', function(req, res) {
    res.status(302);
    res.redirect('/redirected');
    res.end();
});

server.get('/redirected', function(req, res) {
    res.status(200);
    res.write('You have been redirected');
    res.end();
});

server.get('/cache', function(req, res) {
    res.status(200);
    res.write('cache this resource');
    res.set('Cache-Control', 'max-age=86400')
    res.end();
});

server.get('/cookie', function(req, res) {
    res.status(200);
    res.write('i gave you a cookie');
    res.cookie('hello', 'world')
    res.end();
});

server.listen(8080);
// http://localhost:8080/missing should return a status code 404 with 'your princess is in another castle' in plain text

// http://localhost:8080/redirect should redirect the request to '/redirected' by using 302 as the status code

// http://localhost:8080/cache should return 'cache this resource' in plain text and set the cache max age to a day

// http://localhost:8080/cookie should return 'i gave you a cookie' in plain text and set 'hello=world' as a cookie

// http://localhost:8080/check should return 'yes' / 'no' in plain text depending on whether the browser has the 'hello' cookie