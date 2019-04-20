const koaBetterBody = require("koa-better-body");
const path = require("path");

module.exports = app => {
  return koaBetterBody({
    uploadDir: path.resolve(app.config.app.uploadDir)
  });
};
