// 文件
const fs = require('fs')

fs.readFile('1.txt', (err, data)=>{
	if (err) {
		console.log('文件读取失败');
	} else {
		fs.writeFile('2.txt', data, err => {
			if (err) {
				console.log(文件写入失败);
			}
		})
	}
})