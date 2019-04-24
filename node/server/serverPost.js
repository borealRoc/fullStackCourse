const http = require('http')
const querystring = require('querystring')

let server = http.createServer((req, res) => {

	let str = ''
	// 当有一块数据到达
	req.on('data', data => {
		str += data;
		console.log('试一下get请求会不会触发这个事件1');
	})
	// 当全部数据到达
	req.on('end', () => {
		let post = querystring.parse(str)
		console.log('试一下get请求会不会触发这个事件2');
		console.log(str);
		console.log(post);
	})
	res.end()

})

server.listen(8080)