// 路径
const path = require('path');

const str = '/var/local/www/aaa/1.png';

console.log(path.dirname(str)); //路径    /var/local/www/aaa
console.log(path.basename(str)); //文件名  1.png
console.log(path.extname(str));  //扩展名  .png