let a = new Buffer('ashdfker-==-skldfh-==-sjdgf234');
let b = new Buffer('hg1!$rtrt%!dre!we');

// 查找
console.log(a.indexOf('-==-'));
// 截取
console.log(a.slice(3,8).toString());
// 切割
Buffer.prototype.split = Buffer.prototype.split || function (s) {

	let arr = [];
	let cur = 0;
    let pos = this.indexOf(s);

	while (pos > -1) {
		arr.push(this.slice(cur, pos));
		cur = pos + s.length;
		pos = this.indexOf(s, cur);
	}
	arr.push(this.slice(cur));
	return arr;
}

console.log(a.split('-==-').toString());
console.log(b.split('!').toString());
