// 二进制
const fs = require('fs');

fs.readFile('bird.png', (err, data) => {
	if (err) {
		console.log('文件读取失败');
	} else {
		// fs.writeFile('bird2.png', data.toString(), err => {
		// 	if (err) {
		// 		console.log('文件写入失败');
		// 	}
		// })
		fs.writeFile('bird3.png', data, err => {
			if (err) {
				console.log('文件写入失败');
			}
		})
	}
})
