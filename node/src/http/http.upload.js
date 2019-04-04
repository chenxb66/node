const http = require('http');
const split = require('./split');
const fs = require('fs');

http.createServer((req, res) => {

    if (req.url == '/favicon.ico') {
        res.end();
        return;
    }

    let arr = [];
    req.on('data', buffer => {
        arr.push(buffer);
    });

    req.on('end', () => {
        // 合并所有buffer到一个
        let fullBuffer = Buffer.concat(arr);
        // 算出上传符号
        let delimiter = '--' + req.headers['content-type'].split('; ')[1].split('=')[1];
        // 每个key=>value分割成
        let part = split.buffer(fullBuffer, delimiter);
        // 首尾去掉
        part.pop();
        part.shift();
        // 保存参数
        let post = {};
        part.forEach((buffer) => {
            // 删除首尾的\r\n
            buffer = buffer.slice(2, buffer.length - 2);
            // 用\r\n\r\n分成key和vlaue
            let keyValue = split.buffer(buffer, "\r\n\r\n");
            // 保存key,value
            let [name, value] = keyValue;
            // key转成字符串
            name = name.toString();
            // 如果key中包含了\r\n,则表示为上传文件的信息（因为2行头信息）
            if (name.indexOf("\r\n") != -1) {
                // 上传的文件名
                let filename = name.toString().split('\r\n')[0].split('=')[2].replace(/(^"*)|("*$)/g, "");
                //  写入文件中
                fs.writeFile(`./uploads/${filename}`, value, (err) => {
                    console.log(err);
                    console.log(err ? '失败' : '成功');
                });
                // 保存到数组中
                post[name.split('; ')[1].split('=')[1].replace(/(^"*)|("*$)/g, "")] = `./uploads/${filename}`;
            } else {
                // 普通数组
                post[name.split('=')[1].trim('"').replace(/(^"*)|("*$)/g, "")] = value.toString();
            }
        });

        console.log(post);

        res.end();
    });

}).listen(8080);