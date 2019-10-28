const Router = require('koa-router');
const auth = require('./auth');
const post = require('./post');
const comment = require('./comment');
const user = require('./user');

const api = new Router();

api.get('/', (ctx) => {
  ctx.body = 'api';
});

api.use('/auth', auth.routes());
api.use('/post', post.routes());
api.use('/comment', comment.routes());
api.use('/user', user.routes());

module.exports = api;
