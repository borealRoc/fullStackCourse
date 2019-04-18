// 签名
const crypto = require('crypto');

let md5Obj = crypto.createHash('md5');
let sha1Obj = crypto.createHash('sha1');

md5Obj.update('123456')
sha1Obj.update('123456')

console.log(md5Obj.digest('hex'));
console.log(sha1Obj.digest('hex'));

// 双层md5
function md5(str) {
	let obj = crypto.createHash('md5');
	obj.update(str);
	return obj.digest('hex');
}
let nonce = 'd3jlk5f6'

console.log(md5(md5('123456')) + nonce);