var socket = io.connect('http://localhost:8080', { 'forceNew': true });

//RECIBIR LOS MENSAJES DESDE EL EVENTO 'messages'
socket.on('imprimir-mensaje', function (data) {
   console.log("Se ha mandado a imprimir: " + data.text);
});
