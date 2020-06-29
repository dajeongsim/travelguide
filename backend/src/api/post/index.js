const Router = require('koa-router');
const postCtrl = require('./post.ctrl');

const post = new Router();

// post.get('/', (ctx) => {
//   ctx.body = 'post';
// });

post.get('/cities/:category', postCtrl.cityList);
post.get('/tags', postCtrl.tagList);
post.get('/', postCtrl.postList);
post.get('/:postId/:userId', postCtrl.getPost);

post.post('/', postCtrl.writePost);
post.post('/like', postCtrl.toggleLike);
post.post('/blame', postCtrl.blame);

module.exports = post;
