const express = require('express');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('Co nguoi connect id: ' + socket.id);

    socket.on('tao-room', data => {
        socket.join(data);
        socket.Phong = data;
        let mang = Object.keys(socket.adapter.rooms);
        io.sockets.emit('server-send-room', mang);
        socket.emit('server-send-room-socket', data);
    });

    socket.on('user-chat', data => {
        io.sockets.in(socket.Phong).emit('server-chat', data);
    });

    socket.on('chuyen-room', data => {
        console.log(data);
        socket.leave(data.leave);
        socket.join(data.new);
        socket.emit('server-send-room-socket', data.new);
        let mang = Object.keys(socket.adapter.rooms);
        io.sockets.emit('server-send-room', mang);
    })
})

server.listen(3000, () => console.log('Listening port 3000.'));

app.get('/', (req, res) => res.render('index'));