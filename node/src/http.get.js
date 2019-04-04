
/**
 * http接收get数据
 */
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    // 处理GET数据
    let {pathname, query} = url.parse(req.url, true);
    res.end();
});

server.listen(8080)