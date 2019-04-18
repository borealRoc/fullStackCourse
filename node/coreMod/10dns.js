// 解析域名
const dns = require('dns')

const baidu = `www.baidu.com`

dns.resolve(baidu, (err, res) => {
	if (err) {
		console.log('解析失败');
	} else {
		console.log(res); //[ '14.215.177.39', '14.215.177.38' ]
	}
})