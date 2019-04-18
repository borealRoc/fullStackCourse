const http = require('http')
const querystring = require('querystring')

let server = http.createServer((req, res) => {

	let str = ''
	// 当有一块数据到达
	req.on('data', data => {
		str += data;
	})
	// 当全部数据到达
	req.on('end', () => {
		let post = querystring.parse(str)
		console.log(str);
		console.log(post);
	})
	res.end()

})

server.listen(8080)