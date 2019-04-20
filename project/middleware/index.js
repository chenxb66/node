const errorHandle = require("./error-handle");
const sessionStart = require("./session-start");
const postParser = require("./post-parser");

module.exports = app => {
  // 错误处理(当前请求)
  app.use(errorHandle(app));

  // 加载session(当前请求)
  app.use(sessionStart(app));

  // post和upload解析(当前请求)
  app.use(postParser(app));
};