const http = require('http');
const io = require('socket.io');

let httpServer = http.createServer();
httpServer.listen(8080);
let wsServer = io.listen(httpServer);
wsServer.on('connection', sock => {
	// sock.emit 发送
	// sock.on   接收
	sock.on('msg', (a, b, c) => {
		console.log(a, b, c);
	})
	setInterval(function () {
		sock.emit('t', new Date().getTime());
	}, 1000)
})