const http = require('http');
const fs = require('fs');
const path = require('path');
const {promisify} = require('util');
const url = require('url');

const readFile = promisify(fs.readFile);

const server = http.createServer(async (req, res) => {
    try {
        // 处理GET数据
        let {pathname, query} = url.parse(req.url, true);

        let buffer = await readFile(path.resolve(`../template${req.url}`));
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html;charset=utf-8');
        res.write(buffer);
        res.end();
    } catch(e) {
        res.setStatus = 404;
        res.write('Not Found');
        res.end();
    }
});

server.listen(8080)