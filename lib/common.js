// 切割buffer数据
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