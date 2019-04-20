const fs = require('fs');
const path = require('path');

class Config {
  constructor() {
    var files = fs.readdirSync(path.resolve(__dirname));
    files.forEach(item => {
      item = item.replace(/\.js$/, '');

      if (item != 'index') {
        this[item] = require(`./${item}`);
      }
    });
  }
}

const config = new Config();

module.exports = config;
