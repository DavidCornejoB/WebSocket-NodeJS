var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//ARREGLO QUE CONTIENE TODOS LOS MENSAJES ENVIADOS A TRAVÉS DE WEBSOCKET
var messages = [{
        id: 1,
        text: "Hola soy un mensaje desde el servidor",
        author: "Servidor WebSocket"
}];

app.use(express.static('public'));

//PARA ESCUCHAR LOS SOCKETS:
io.on('connection', function (socket) {
    console.log('Alguien se ha conectado con Sockets');

    //ENVIAR MENSAJE DESDE SERVIDOR
    socket.emit('messages', messages);

    //ESCUCHAR MENSAJE DESDE CLIENTE
    socket.on('new-message', function(data){
        messages.push(data);
        io.sockets.emit('messages', messages);
    });

    //MANDAR MENSAJE A LA IMPRESORA
    socket.on('imprimir', function(data){
        socket.emit('imprimir-mensaje', data);
    });

});

server.listen(8080, function(){
    console.log("Servidor corriendo en http://localhost:8080");
});