const socket = io('http://localhost:3000/');

$(document).ready(() => {
    $('#btnCreateRoom').click(() => {
        socket.emit('tao-room', $('#txtRoom').val());
    });
})