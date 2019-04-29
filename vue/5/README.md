## 必须插件
- 生产依赖
```shell
npm i vue vue-router -S
```
- 开发依赖
```shell
npm i webpack webpack-cli webpack-dev-server file-loader style-loader css-loader vue-loader html-webpack-plugin vue-html-loader vue-style-loader vue-template-compiler -D
```
> ```webpack``` | ```webpack-cli``` | ```webpack-dev-server``` 热更新服务器     
> ```file-loader``` 字体文件、图片处理依赖      
> ```style-loader``` |  ```css-loader``` 处理css的依赖      
> ```html-webpack-plugin``` 给index.html的自动引入bundle.js      
> ```vue-loader``` | ```vue-html-loader``` | ```vue-style-loader``` | ```vue-template-compiler``` 处理vue组件文件的