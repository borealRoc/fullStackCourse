
// parse application/x-www-form-urlencoded
server.use(body.urlencoded({ extended: false }))

let upload = multer({ dest: './upload/' })
server.use(upload.any());

// 处理请求
server.post('/api', (req, res) => {
	console.log(req.body);
	console.log(req.files);
	res.send('hello world');
})

// 静态资源
server.use(express.static('./www/'));