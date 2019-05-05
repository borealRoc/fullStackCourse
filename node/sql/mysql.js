const mysql = require('mysql');

let db = mysql.createConnection({
	host: 'localhost', 
	port: 3306,
	user: 'root',
	password: 'QSXdr1991',
	database: '20190429'
});
// 增
// db.query(`INSERT INTO user_data (ID, name, gender, chinese, math, english) VALUES (0, '小许', '男', 100, 100, 100);`, (err, data) => {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log(data);
// 	}
// })
// 删
db.query(`DELETE FROM user_data WHERE ID = 1`, (err, data) => {
	if (err) {
		console.log(err);
	} else {
		console.log(data);
	}
})