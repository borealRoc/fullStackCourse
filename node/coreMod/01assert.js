// 断言
const assert = require('assert')

function sum(a, b) {
	assert(arguments.length === 2, '必须传入两个参数');
	assert(typeof a === 'number', '第一个参数必须是数字');
	assert(typeof b === 'number', '第二个参数必须是数字');
	console.log(a + b);
}

sum(1, 2)  	//3
sum(1) 		//AssertionError [ERR_ASSERTION]: 必须传入两个参数
sum('1', 2) //AssertionError [ERR_ASSERTION]: 第一个参数必须是数字
sum(1, '2') //AssertionError [ERR_ASSERTION]: 第二个参数必须是数字