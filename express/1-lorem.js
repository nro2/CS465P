'use strict';

var express = require('express'); // do not change this line

var server = express();

server.get('lorem', function(req, res) {
    res.status(200);
    res.write('<!DOCTYPE html><html><body>lorem ipsum</body></html>')
    res.end();
})

server.listen(8080);
// http://localhost:8080/lorem should return '<!DOCTYPE html><html><body>lorem ipsum</body></html>' as html