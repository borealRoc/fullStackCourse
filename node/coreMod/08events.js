// 事件队列
const Event = require('events').EventEmitter

let ev = new Event()

// 监听：类似于函数定义
ev.on('msg', (a, b, c) => {
	console.log('接收到了msg事件：' + a + b + c);

})

// 派发：类似于函数调用
ev.emit('msg', 1, 2, 3)