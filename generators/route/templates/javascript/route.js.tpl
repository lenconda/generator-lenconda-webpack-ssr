const Router = require('koa-router');

const <%= name %>Router = new Router({
  prefix: <%= prefix %>
});

<%= name %>Router.get('/', async (ctx, next) => {
  
});

module.exports = <%= name %>Router;
