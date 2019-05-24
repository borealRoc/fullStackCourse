const http = require('http');
const url = require('url');
const querystring = require('querystring');

let server = http.createServer((req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');

	let {pathname, query} = url.parse(req.url, true);
	console.log(pathname, query);

	let arr = [];
	req.on('data', data => {
		arr.push(data)
	})
	req.on('end', () => {
		console.log(arr);
		res.write('Successful');
		res.end();
	})
})
server.listen(8080);