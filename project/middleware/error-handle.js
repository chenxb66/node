module.exports = app => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      if (app.config.app.env == "developement") {
        throw err;
      } else {
        ctx.throw(500, "Internal Server Error");
      }
    }
  };
};
