const path = require('path');
const kcors = require('kcors');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const config = require('./config');
const views = require('koa-views');
const serve = require('koa-static');
const proxy = require('http-proxy-middleware');
const connect = require('koa2-connect');
const fs = require('fs-extra');
const glob = require('glob');

const indexRouter = require('./routers/index');

const app = new Koa();

app.use(views(path.join(__dirname, config.isDev ? '../dev' : '../dist'), {
  map: {
    html: 'handlebars'
  }
}));

app.use(async (ctx, next) => {
  if (ctx.url.startsWith('/api')) {
    ctx.respond = false;
    await connect(proxy({
      target: 'SOME_API_URL',
      changeOrigin: true,
      // pathRewrite: {
      //   '^/api': ''
      // },
      secure: config.isDev ? false : true,
    }))(ctx, next);
  }
  await next();
});

app.use(indexRouter.routes()).use(indexRouter.allowedMethods());
glob
  .sync(path.join(__dirname, './routers/**/index.*'), {
    realpath: true,
    absolute: false
  })
  .map((entry, index) => path.dirname(entry))
  .map((entry, index) => path.relative(path.join(__dirname, './routers'), entry))
  .filter((entry, index) => entry !== '')
  .forEach((entry, index) => {
    const router = require('./routers/' + entry);
    app.use(router.routes()).use(router.allowedMethods());
  });

app.use(serve(path.join(__dirname, (config.isDev ? '../dev' : '../dist'))));
app.use(kcors());
app.use(bodyParser());
if (config.isDev) app.use(logger());

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

config.isDev && process.on('SIGINT', () => {
  fs.removeSync('dev');
  process.exit(0);
});

app.listen(port);
