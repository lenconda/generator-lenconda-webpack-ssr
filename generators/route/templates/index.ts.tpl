import Router from 'koa-router';

const router = new Router({
  prefix: '<%= prefix %>'
});

router.get('/', async (ctx, next) => {
  // do some rendering
});

export default router;
