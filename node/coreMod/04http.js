const http = require('http')
const fs = require('fs')

let server = http.createServer((req, res) => {
	if (req.url) {
		let path = `www${req.url}`
		fs.readFile(path, (err, data) => {
			if (err) {
				res.write('404')
			} else {
				res.write(data)
			}
			res.end()
		})
	}
})

server.listen(8800)