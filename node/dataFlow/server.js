const http = require('http');
const common = require('../../lib/common'); 

let server = http.createServer((req, res) => {

	let arr = [];

	req.on('data', data => {
		arr.push(new Buffer(data));
	})
	req.on('end', () => {
		let data = Buffer.concat(arr);

		// 处理文件上传二进制数据
		let post = {};
		let files = {};

		// 1. 获取数据分隔符
		if (req.headers['content-type']) {
			let str = req.headers['content-type'].split('; ')[1];
			if (str) {
				let boundary = '--' + str.split('=')[1];
				// 2. 用"<分隔符>"切开数据
				let arr = data.split(boundary);
				// 3. 丢弃头尾元素
				arr.shift();
				arr.pop();
				// 4. 丢弃每一项的头尾\r\n
				arr.map(item => {
					item.slice(2, item.length -2);

				});
				// 5. 用第一次出现的"\r\n\r\n"切分
				arr.forEach(item => {
					let n = item.indexOf('\r\n\r\n');
					let description = item.slice(0, n);
					let content = item.slice(n + 4);
					description = description.toString();
					if (description.indexOf('\r\n') === -1) {
						// 普通数据
						let name = 
					} else {
						// 文件数据
					}

				})
			}
		}

		res.end();

	})
	
})
server.listen(8080)