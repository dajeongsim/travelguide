const Router = require('koa-router');
const postCtrl = require('./post.ctrl');

const post = new Router();

// post.get('/', (ctx) => {
//   ctx.body = 'post';
// });

post.get('/cities/:category', postCtrl.cityList);
post.get('/tags', postCtrl.tagList);
post.get('/', postCtrl.postList);

module.exports = post;
