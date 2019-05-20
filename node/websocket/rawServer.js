const net = require('net');
const crypto = require('crypto');

let server = net.createServer(sock => {

	// 有数据
	sock.on('data', data => {

	})

	// 断开了
	sock.on('end', () => {

	})
});
server.listen(8080);