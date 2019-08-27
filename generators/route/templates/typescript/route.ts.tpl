import Router from 'koa-router';

const <%= name %>Router = new Router({
  prefix: <%= prefix %>
});

<%= name %>Router.get('/', async (ctx, next) => {
  
});

export default <%= name %>Router;
