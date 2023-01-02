var fs = require('fs');
var https = require('https');

var express = require('express');
var app = express();

var options = {
  key: fs.readFileSync('./file.pem'),
  cert: fs.readFileSync('./file.crt')
};
var port = 3001;

var server = https.createServer(options, app);
var io = require('socket.io')(server);

app.get("/", (req, res) => {
  res.send("Tersambung ke api/routes");
});

io.on('connection', function(socket) {
  console.log('new connection');
  socket.emit('message', 'This is a message from the dark side.');
});

server.listen(port, function() {
  console.log('server up and running at %s port', port);
});