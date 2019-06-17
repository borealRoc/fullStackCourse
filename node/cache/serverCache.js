const http = require('http');
const fs = require('fs');
const url = require('url');


http.createServer((req, res) => {

	let {pathname} = url.parse(req.url);
	let path = 	`www${pathname}`;

	
	function errMethod () {
		res.writeHeader(404);
		res.write('Not Found');
		res.end();
	}

	fs.stat(path, (err, stat) => {
		if (err) {
			errMethod()
		} else {
			// 判断请求头是否包含'if-modified-since'
			if (req.headers['if-modified-since']) {
			// 如果有：说明不是第一次请求，则要进一步判断浏览器文件的'if-modified-since'和服务器文件的’last-mofied‘
				// 获取请求头的'if-modified-since'
				let time_client = new Date(req.headers['if-modified-since']).getTime();
				time_client = Math.floor(time_client/1000);
				let time_server = stat.mtime.getTime();
				time_server = Math.floor(time_server/1000);
				// 将两个时间进行对比
				if (time_client < time_server) {
					// 说明服务器文件有更新
					firstReqRes();
				} else {
					// 说明服务器文件没有更新
					res.writeHeader(304);
					res.write('Not Modified');
					res.end();
				}
			} else {
				// 如果没有：说明是第一次请求,则服务器返回给浏览器内容以及响应头’if-modified-since‘
				firstReqRes();
			}
		}
		function firstReqRes () {
			let rs = fs.createReadStream(path);
			res.setHeader('last-modified', stat.mtime.toGMTString());
			rs.pipe(res);
			rs.on('error', err => {
				errMethod ();
			})
		}
	})


}).listen(8888);
