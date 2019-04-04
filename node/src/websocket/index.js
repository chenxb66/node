const http = require('http');
const io = require('socket.io');

// 建立普通http服务,websocket登录交换密钥用
const httpServer = http.createServer((req, res) => {});
httpServer.listen(8080);

// 建立ws
const wsServer = io.listen(httpServer); // 这就是为什么需要httpServer的原因
wsServer.on('connection', (sock) => {
    
    // 所有人都看得到
    wsServer.emit('server-send', `欢迎${sock.id}加入聊天室`);

    // 接收客户端的消息，消息名称是aaa，客户端传了2个参数
    sock.on('client-send', (message) => {
        sock.emit('server-send', `服务器返回：${message}`); // 服务器主动发东西
    });
}); 