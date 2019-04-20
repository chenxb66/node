const session = require("koa-session");

module.exports = app => {
  return session({
      maxAge: app.config.session.maxAge * 1000,
      renew: app.config.session.renew
  }, app);
};
