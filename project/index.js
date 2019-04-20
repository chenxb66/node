const Koa = require("koa");
const extend = require("./extend"); // 框架扩展
const middleware = require('./middleware'); // 请求中间件
const router = require('./routes'); // 路由

// 创建http对象
const app = new Koa();
app.listen(8080);

// 框架增强功能(全局)
extend(app);

// 加载中间件(当次请求)
middleware(app);

// 加载路由
router(app);