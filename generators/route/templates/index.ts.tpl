import Router from 'koa-router';

const router = new Router({
  prefix: '<%= prefix %>'
});

router.get('/', async (ctx, next) => {
  ctx.body = 'It works!';
});

export default router;
