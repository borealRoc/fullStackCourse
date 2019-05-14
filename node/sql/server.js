const http = require('http');
const mysql = require('mysql');
const fs = require('fs');
const url = require('url');
const zlib = require('zlib');
const crypto = require('crypto');

// 连接数据库
let db = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'QSXdr1991',
    database: '20190429'
});

// 双重md5加密
const _key='sadfslekrtuew5iutoselgdtjiypoydse4ufhs.edtyo;s8te4arfeliawkfhtsie5tlfia;sefdshroiupeoutwyeli5gurse;ihf';
function md5 (str) {
	let obj = crypto.createHash('md5');
	obj.update(str);
	return obj.digest('hex');
}
function md5_2 (str) {
	return md5(md5(str) + _key);
}

// 创建登录注册服务
let server = http.createServer((req, res) => {
    let { pathname, query } = url.parse(req.url, true);
    let { user, pass } = query;

    switch (pathname) {
        // 接口
        case '/reg':
            // 校验
            if (!user) {
                res.write('{"err": 1, "msg": "user is requireed"}');
                res.end();
            } else if (!pass) {
                res.write('{"err": 1, "msg": "password is requireed"}');
                res.end();
            } else if (!/^\w{4,16}$/.test(user)) {
                res.write('{"err": 1, "msg": "user is invalid"}');
                res.end();
            } else if (!/^\w{4,16}$/.test(pass) || /['|"|;]/.test(pass)) {
                res.write('{"err": 1, "msg": "password is invalid"}');
                res.end();
            } else {
                db.query(`SELECT * FROM user_table WHERE username = '${user}'`, (err, data) => {
                    if (err) {
                        res.write('{"err": 1, "msg": "database error"}');
                        res.end();
                    } else if (data.length > 0) {
                        res.write('{"err": 1, "msg": "user exsits"}');
                        res.end();
                    } else {
                        db.query(`INSERT INTO user_table (ID, username, password) VALUES (0, '${user}', '${md5_2(pass)}')`, (err, data) => {
                            if (err) {
                                res.write('{"err": 1, "msg": "database error"}');
                                res.end();
                            } else {
                                res.write('{"err": 0, "msg": "register success"}');
                                res.end();
                            }
                        })
                    }
                })
            }
            break;
        case '/login':
            if (!user) {
                res.write('{"err": 1, "msg": "user is requireed"}');
                res.end();
            } else if (!pass) {
                res.write('{"err": 1, "msg": "password is requireed"}');
                res.end();
            } else if (!/^\w{4,16}$/.test(user)) {
                res.write('{"err": 1, "msg": "user is invalid"}');
                res.end();
            } else if (!/^\w{4,16}$/.test(pass) || /['|"|;]/.test(pass)) {
                res.write('{"err": 1, "msg": "password is invalid"}');
                res.end();
            } else {
                db.query(`SELECT * FROM user_table WHERE username = '${user}'`, (err, data) => {
                    if (err) {
                        res.write('{"err": 1, "msg": "database error"}');
                        res.end();
                    } else if (data.length === 0) {
                        res.write('{"err": 1, "msg": "No this user"}');
                        res.end();
                    } else  if (data[0].password !== md5_2(pass)) {
                       res.write('{"err": 1, "msg": "user or password is wrong"}');
                       res.end();
                    } else {
                    	res.write('{"err": 0, "msg": "login success"}');
                    	res.end();
                    }
                })
            }
            break;
        
       	// 静态文件
        default:
            // 缓存 TODO
            let path = `www${pathname}`;
            let rs = fs.createReadStream(path);
            let gz = zlib.createGzip();
            res.setHeader('content-encoding', 'gzip');
            rs.pipe(gz).pipe(res);
            rs.on('error', err => {
                if (err) {
                    res.writeHeader(404);
                    res.write('Not Founded');
                    res.end();
                }
            })
    }
})
server.listen(8080);