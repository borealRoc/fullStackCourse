const express = require('express');  	// 主体
const body = require('body-parser');    // 接收普通post数据
const multer = require('multer');       // 接收文件post数据

let server = express();
server.listen(8080);

server.get('/', (req, res) => {
	res.send('hello world');
})