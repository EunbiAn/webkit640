var http=require('http');
var express=require('express');
var app = express()
var socketio=require('socket.io');
var cors=require('cors');

app.use( cors() );

var server = http.createServer(app).listen(3000, function() {
    console.log('서버가 시작되었습니다. 포트: ' + 3000);
});

var io = socketio.listen(server);

io.sockets.on('connection', function(socket){
    console.log('connection info: ', socket.request.connetion._peename);
    
    socket.remoteAddress = socket.request.connection._peername.address;
    socket.remotePort = socket.request.connection._peername.port;
});




