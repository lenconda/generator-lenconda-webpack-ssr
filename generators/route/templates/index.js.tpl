const Router = require('koa-router');

const router = new Router({
  prefix: '<%= prefix %>'
});

router.get('/', async (ctx, next) => {
  ctx.body = 'It works!';
});

module.exports = router;
