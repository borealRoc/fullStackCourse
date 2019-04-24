const zlib = require('zlib');
const fs = require('fs');

let rs = fs.createReadStream(`big.js`);
let ws = fs.createWriteStream(`big.js.gz`);
let gz = zlib.createGzip();

rs.pipe(gz).pipe(ws);

rs.on('error', err => {
	console.log('文件压缩失败');
})
ws.on('finish', () => {
	console.log('文件压缩成功');
})