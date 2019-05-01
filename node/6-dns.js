'use strict';

var http = require('http'); // do not change this line
var dns = require('dns'); // do not change this line

// http://localhost:8080/pdx.edu should return '131.252.115.150' in plain text (address might be different, there could even be multiple addresses)
var server = http.createServer(function(req, res) {
    if (req.url != '/favicon.ico'){
        if (req.url.indexOf('.') == -1) {
           res.writeHead(200, {
             'Content-Type': 'text/plain'
            });    
        res.end('error')  
        }
        else {
            res.writeHead(200, {
              'Content-Type':'text/plain'
            });
            let url = req.url;
            let domain = url.replace('/', '');
            dns.resolve4(domain, function(err, addresses){
                let ips = addresses.toString();
                let newips = ips.replace(/,/g, '\n')
                res.end(newips);
            })
            

        }; 
    };  
  });
 
  server.listen(process.env.PORT || 8080);
// http://localhost:8080/sniklaus.com should return '216.239.36.21\n216.239.38.21\n216.239.32.21\n216.239.34.21' in plain text (addresses / order might be different)

// http://localhost:8080/error should return 'error' in plain text