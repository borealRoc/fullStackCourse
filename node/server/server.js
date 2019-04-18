const http = require('http');
const url = require('url');
const querystring = require('querystring');

let server = http.createServer((req, res) => {
	// get数据
	let {pathname, query} = url.parse(req.url, true);

	// post数据
	let str = '';
	req.on('data', data => {
		str += data;
	})
	req.on('end', () => {
		let post = querystring.parse(str);
		console.log(query);
		console.log(post);
	})
	res.end();
})
server.listen(8090)