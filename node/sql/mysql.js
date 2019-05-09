const mysql = require('mysql');

let db = mysql.createPool({
	host: 'localhost', 
	port: 3306,
	user: 'root',
	password: 'QSXdr1991',
	database: '20190429',
	maxConnection: 10
});
// 增
db.query(`INSERT INTO stu_data (ID, name, gender, chinese, math, english) VALUES (0, 'xu', '男', 100, 100, 100);`, (err, data) => {
	if (err) {
		console.log(err);
	} else {
		console.log(data);
	}
})
// 删
db.query(`DELETE FROM stu_data WHERE ID = 5`, (err, data) => {
	if (err) {
		console.log(err);
	} else {
		console.log(data);
	}
})
// 改
db.query(`UPDATE stu_data SET chinese=5,math=99 WHERE ID = 2`, (err, data) => {
	if (err) {
		console.log(err);
	} else {
		console.log(data);
	}
})
// 查
db.query(`SELECT name, gender FROM stu_data WHERE ID = 3`, (err, data) => {
	if (err) {
		console.log(err);
	} else {
		console.log(data);
	}
})