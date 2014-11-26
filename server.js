var http = require('http');
var browserify = require('browserify');
var url = require('url');
var fs = require('fs');
var os = require('os');
var React = require('react');

var Hello = React.createFactory(require('./hello'));

var html = [
  '<!doctype html>',
  '<html><body>',
  React.renderToString(new Hello()),
  '<script src="/js" defer></script>',
  '</body></html>'
].join('');

var jsfile = os.tmpdir() + 'bundle.js';
browserify('./client.js').bundle().pipe(fs.createWriteStream(jsfile));

var httpServer = http.createServer(function(req, res) {
  var path = url.parse(req.url).pathname;

  if (/^\/js$/.test(path)) {
    res.writeHead(200, {'Content-Type': 'application/javascript'});
    fs.createReadStream(jsfile).pipe(res);

  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);

  }
});

httpServer.listen(3000);
