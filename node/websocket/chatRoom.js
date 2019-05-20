const http = require('http');
const io = require('socket.io');

let httpServer = http.createServer();
httpServer.listen(8080)

let wsServer = io.listen(httpServer);
let aSocket = [];
wsServer.on("connection", socket => {

    aSocket.push(socket);

    socket.on('disconnect', () => {
        let n = aSocket.indexOf(socket);
        if (n !== -1) {
            aSocket.splice(n, 1);
        }
    })

    socket.on('msg', chatMes => {
        aSocket.forEach(sock => {
            if (sock !== socket) {
                sock.emit('msg', chatMes);
            }
        })
    })
})

setInterval(function() {
    console.log(aSocket.length);
}, 1000)