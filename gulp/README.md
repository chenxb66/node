# gulp

## 安装
- 安装全局启动器
```shell
npm i gulp -g
```
- 安装代码库
```shell
npm i gulp -D
```

## 常用插件
- 压缩js: gulp-uglify
- 拼接js：gulp-concat
- 文件名改名：gulp-rename
```javascript
gulp.pipe(rename({suffix: '.min'})); // xxx.min.js
```
### es6转换：gulp-babel
- 安装
```shell
npm i gulp-babel @babel/core @babel/preset-env -D
```

### sourcemap
```shell
npm i gulp-sourcemaps
```