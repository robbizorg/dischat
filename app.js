var express = require('express');
var path = require('path');
var routes = require('./routes/index');
var config = require('./config/config');

var app = express();
var http = require('http').Server(app);
var io = require('./lib/sockets.js').listen(http);

http.listen(config.app.port);

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

console.log("*****************************");
console.log("* App running at port: " + config.app.port + " *");
console.log("*****************************");

