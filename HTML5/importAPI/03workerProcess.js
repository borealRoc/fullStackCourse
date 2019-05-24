this.onmessage = function (ev) {
	let {n1, n2} = ev.data;
	let result = n1 + n2;
	this.postMessage(result);
}