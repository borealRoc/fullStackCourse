const http = require('http');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs')

let users = {};

let server = http.createServer((req, res) => {

	
	let {pathname, query} = url.parse(req.url, true);
	let str = '';

	req.on('data', data => {
		str += data
	})
	req.on('end', () => {
		let post = querystring.parse(str)

		let {user, pass} = query

		switch(pathname) {

			case '/reg': //注册
				if (!user) {
					res.write('{"err": 1, "msg": "user is required"}');
				} else if (!pass) {
					res.write('{"err": 1, "msg": "password is required"}')
				} else if (!/^\w{4,8}$/.test(user)) {
					res.write('{"err": 1, "msg": "user is invalid"}')
				} else if (/['|"]/.test(pass)) {
					res.write('{"err": 1, "msg": "password is invalid"}')
				} else if (users[user]) {
					res.write('{"err": 1, "msg": "user already existed"}')
				} else {
					users[user] = pass;
					res.write('{"err": 0, "msg": "register successful"}')
				}
				res.end();
			break;

			case '/login': //登录
				if (!user) {
					res.write('{"err": 1, "msg": "user is required"}')
				} else if (!pass) {
					res.write('{"err": 1, "msg": "password is required"}')
				} else if (!/^\w{4,8}$/.test(user)) {
					res.write('{"err": 1, "msg": "user is invalid"}')
				} else if (/['|"]/.test(pass)) {
					res.write('{"err": 1, "msg": "password is invalid"}')
				} else if (!users[user]) {
					res.write('{"err": 1, "msg": "user no exist"}')
				} else if (users[user] !== pass) {
					res.write('{"err": 1, "msg": "username or password is wrong"}')
				} else {
					res.write('{"err": 0, "msg": "login successful"}')
				}
				res.end();
			break;

			default: //其它，文件
				let path = 	`www${pathname}`
				fs.readFile(path, (err, data) => {
					if (err) {
						res.writeHeader(404);
						res.write('Not Found');
					} else {
						res.write(data);
					}
					res.end();
				})

		}
	})

})
server.listen(8080)