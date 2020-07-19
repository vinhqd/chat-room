const socket = io('http://localhost:3000/');

socket.on('server-send-room', data => {
    $('#dsRoom').html("");
    data.forEach(element => {
        $('#dsRoom').append(`<h4 class='room'> ${element}</h4>`)
    });
});

socket.on('server-send-room-socket', data => {
    $('#roomHienTai').html(data);
});

socket.on('server-chat', data => {
    $('#right').append(`<div>${data}</div>`);
});

$(document).ready(() => {
    $('#btnCreateRoom').click(() => {
        socket.emit('tao-room', $('#txtRoom').val());
    });

    $('#btnChat').click(() => {
        socket.emit('user-chat', $('#txtMessage').val())
    })

    $('#dsRoom').click(e => {
        if (e.target.className === 'room') {
            socket.emit('chuyen-room', {new: e.target.textContent.trim(), leave: $('#roomHienTai').html()});
        }
    })
})