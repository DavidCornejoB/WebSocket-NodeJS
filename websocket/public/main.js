var socket = io.connect('http://localhost:8080', { 'forceNew': true });

//RECIBIR LOS MENSAJES DESDE EL EVENTO 'messages'
socket.on('messages', function (data) {
   console.log(data);
   render(data);
});

/**
 * FUNCIÓN PARA IMPRESIÓN DE LOS MENSAJES EN EL DOM
 * @param {*} data CORRESPONDE AL MENSAJE RECIBIDO DESDE EL MÉTODO SOCKET.ON
 */
function render(data) {
    var html = data.map(function (elem, index) {
        return(
            `<div>
                <strong>${elem.author}</strong>:
                <em>${elem.text}</em>
            </div>`
        );
    }).join("   ");


    document.getElementById('messages').innerHTML = html;
}

/**
 * FUNCIÓN QUE ENVÍA UN MENSAJE DESDE EL CLIENTE AL SERVIDOR POR WEBSOCKET
 * @param {*} e CORRESPONDE A TODO EL OBJETO DEL MENSAJE QUE VIENE DESDE EL
 * MÉTODO ONSUBMIT DESDE EL HTML
 * @returns FALSE PARA CULMINAR CON LA FUNCIÓN
 */
function addMessage(e) {
    var payload = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };

    socket.emit('new-message', payload);
    return false;
}