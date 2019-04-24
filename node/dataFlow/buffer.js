let a = new Buffer('aaa');
let b = new Buffer('bbb');
let c = new Buffer('ccc');

let arr = Buffer.concat([a, b, c]);

console.log(a);
console.log(b);
console.log(c);
console.log(arr);