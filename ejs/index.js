const ejs = require('ejs');

ejs.renderFile('./resources/views/index/index.html', {name: [1, 2, 3]}, (err, data) => {
    console.log(data);
});