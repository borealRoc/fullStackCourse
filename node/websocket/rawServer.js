const net = require('net');
const crypto = require('crypto');

// 创建net服务器
let server = net.createServer(sock => {
    console.log('连上了');

    // 有数据
    // step1: http数据
    // once: 握手的数据只有一次
    sock.once('data', data => {
        console.log('握手开始...');
        let str = data.toString();
        // GET / HTTP/1.1
        // Host: localhost:8080
        // Connection: Upgrade
        // Pragma: no-cache
        // Cache-Control: no-cache
        // Upgrade: websocket
        // Origin: file://
        // Sec-WebSocket-Version: 13
        // User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36
        // Accept-Encoding: gzip, deflate, br
        // Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
        // Cookie: _ga=GA1.1.1570707851.1550217034
        // Sec-WebSocket-Key: Ga1z4nSm6dWBPrEkoD2MXw==
        // Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits

        // 处理http数据
        // 1. 舍弃第一行和尾部两行
        let lines = str.split('\r\n');
        lines = lines.slice(1, -2);
        // 2. 把每一行根据’: ‘进行分割
        let headers = {};
        lines.forEach(line => {
            let [key, val] = line.split(': ');
            headers[key.toLowerCase()] = val;
        })
        // 3. 验证协议
        if (headers['upgrade'] !== 'websocket') {
            console.log('其它协议', headers['upgrade']);
            sock.end();
            // 4. 验证版本
        } else if (headers['sec-websocket-version'] !== '13') {
            console.log('其它版本', headers['sec-websocket-version']);
            sock.end();
        } else {
            // 5. 取得Sec-WebSocket-Accept
            
            // Sec-WebSocket-Accept根据客户端请求首部的Sec-WebSocket-Key计算出来。
            // 计算公式为：
            // 将Sec-WebSocket-Key跟258EAFA5-E914-47DA-95CA-C5AB0DC85B11拼接。
			// 通过SHA1计算出摘要，并转成base64字符串。
            // sha1(key+mask)->base64=>client
            const mask = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
            let key1 = headers['sec-websocket-key'];
            let hash = crypto.createHash('sha1');
            hash.update(key1 + mask);
            let key2 = hash.digest('base64');

            // 6. 服务端响应协议升级，将Sec-WebSocket-Accept发送给客户端
            // 101 Switching Protocols
			// 服务器已经理解了客户端的请求，并将通过Upgrade 消息头通知客户端采用不同的协议来完成这个请求。
			// 在发送完这个响应最后的空行后，服务器将会切换到在Upgrade 消息头中定义的那些协议。
			// 只有在切换新的协议更有好处的时候才应该采取类似措施。例如，
			// 切换到新的HTTP版本比旧版本更有优势，或者切换到一个实时且同步的协议以传送利用此类特性的资源。
            sock.write(`HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: ${key2}\r\n\r\n`);
            console.log('握手结束...');

            // step1: 真正的数据
            sock.on('data', data => {
            	console.log(data);
            })
        }
    })
    // 断开连接
    sock.on('end', () => {
        console.log('客户端断开了');
    })
})
server.listen(8080);