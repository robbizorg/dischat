var express = require('express');
var path = require('path');
var routes = require('./routes/index');
var config = require('./config/config');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket) {
  console.log("A User Connected");

  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function() {
    console.log("A User Disconnected");
  });

});


http.listen(config.app.port);

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

console.log("*****************************");
console.log("* App running at port: " + config.app.port + " *");
console.log("*****************************");

