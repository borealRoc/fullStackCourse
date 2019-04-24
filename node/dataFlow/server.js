const http = require('http');
const common = require('../../lib/common');
const fs = require('fs');
const uuid = require('uuid/v4');

let server = http.createServer((req, res) => {

	let arr = [];

	req.on('data', data => {
		arr.push(new Buffer(data));
	})

	// 用这种方法处理文件上传数据有两个问题
	// 1.现在：会等到所有数据都到达了才开始处理
    // 更好：服务流：收到一部分就解析一部分   极大节约内存
	// 2.fs.readFile和fs.writeFile这两个方法的问题
	// 2.1 原因：
	// http.createServer((req, res)=>{
	//   fs.readFile(`www${req.url}`, (err, data)=>{
	//     res.write(data);
	//   });
	// });
	// readFile先把所有数据全读到内存中，然后回调：
	// （1）极其占用内存
	// （2）资源利用极其不充分
	// 2.2 更好：
	// 文件流：读一点，处理一点
	
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
				arr = arr.map(item => item.slice(2, -2));
				// // 5. 每个数据用第一次出现的"\r\n\r\n"切分
				arr.forEach(item => {
					let n = item.indexOf('\r\n\r\n');
					let description = item.slice(0, n);
					let content = item.slice(n + 4);
					description = description.toString();
					if (description.indexOf('\r\n') === -1) {
						// 普通数据
						// Content-Disposition: form-data; name="user"
						let name = description.split('; ')[1].split('=')[1].slice(1,-1);
						content = content.toString();
						post[name] = content;
					} else {
						// 文件数据
						// Content-Disposition: form-data; name="f1"; filename="a.txt"
						// Content-Type: text/plain
						let [line1, line2] = description.split('\r\n');
						let [,name, filename] = line1.split('; ');
						let type = line2.split(': ')[1];
						name = name.split('=')[1].slice(1, -1);
						filename = filename.split('=')[1].slice(1, -1);

						// 将上传的文件写入upload文件夹
						let path = `upload/${uuid().replace(/\-/g, '')}`;
						fs.writeFile(path, content, err => {
							if (err) {
								console.log('文件写入失败', err);
							} else {
								files[name] = {filename, path, type};
								console.log(files);
							}
						});
					}

				})
				console.log(post);
			}
		}

		res.end();

	})
	
})
server.listen(8080)