const querystring = require('querystring');

module.exports = {
    urlencoded(json) {
        return (req, res, next) => {
            let buffers = [];

            req.on('data', buffer => {
                buffers.push(buffer);
            });

            req.on('end',() => {
                const body = Buffer.concat(buffers).toString();

                req.body = querystring.parse(body);

                next();
            });
        }
    }
}