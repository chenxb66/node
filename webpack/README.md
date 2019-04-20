# webpack

## 安装
```shell
npm i webpack-cli -g
```

## 单入口
```javascript
module.exports = {
    mode: 'development', // none development production
    entry: './src/js/1.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.min.js'
    }
}
```

## 多入口
```javascript
/**
 * 多入口案例
 * filename: webpack.config.js
 */
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/js/1.js', // 替换下面的[name]
        admin: './src/js/2.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].min.js'
    }
}
```


## loader - 帮助webpack处理js以外的文件

### 处理css：css-loader和style-loader
- 分别作用
    - css-loader 加载css文件，让webpack能解析css文件    
    - style-loader 可以让样式文件变成页面的style标签，没有这步样式不生效

- 安装
```shell
npm i style-loader css-loader
```

```javascript
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/js/1.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.min.js'
    },
    module: {
        // 规则
        rules: [
            // 测试什么文件结尾的,使用什么插件,从后往前执行
            // 先执行css-loader，再执行style-loader，顺序很重要
            {test: /\.css$/, use: ['style-loader', 'css-loader']}
        ]
    }
}
```

### 给css加浏览器前缀：postcss-loader和autoprefixer
- 安装
```shell
npm i postcss-loader autoprefixer -D
```
- autoprefixer
```javascript
/**
 * 供postcss-loader使用，不是webpack
 * filename: postcss.config.css
 */
module.exports = {
    plugins: [
        require('autoprefixer')
    ]
}
```
- postcss-loader
```javascript
/**
 * filename: webpack.config.js
 */
const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = {
    mode: 'development',
    entry: './src/js/1.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.min.js'
    },
    module: {
        // 规则
        rules: [
            // 测试什么文件结尾的,使用什么插件,从后往前执行
            // 先执行css-loader，再执行style-loader，顺序很重要
            {test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader']}
        ]
    }
}
```

### 加载文件并且base64：file-loader