const Router = require('koa-router');
const postCtrl = require('./post.ctrl');

const post = new Router();

// post.get('/', (ctx) => {
//   ctx.body = 'post';
// });

post.get('/cities/:category', postCtrl.cityList);
post.get('/tags', postCtrl.tagList);
post.get('/', postCtrl.postList);

post.post('/', postCtrl.writePost);

module.exports = post;
