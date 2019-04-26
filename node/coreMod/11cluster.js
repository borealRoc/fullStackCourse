const cluster = require('cluster');
const process = require('process');
const os = require('os')
const http = require('http');

if (cluster.isMaster) {
	// 只有主进程才能分裂进程
	for (let i = 0; i < os.cpus().length; i++) {
		// 一般系统有多少核，就创建多少个进程
		cluster.fork()
	}
	console.log('主进程');
} else {
	// 进程调度
	http.createServer((req, res) => {
		console.log(process.pid);
		res.write('Page');
		res.end();
	}).listen(8080)
}


