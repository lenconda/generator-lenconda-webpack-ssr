const Router = require('koa-router');

const indexRouter = new Router();

indexRouter.get('/', async (ctx, next) => {
  await ctx.render('index.html');
});

module.exports = indexRouter;
