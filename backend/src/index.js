require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const { jwtMiddleware } = require('lib/token');
// const session = require('koa-session');
const cors = require('cors');

const api = require('./api');

const {
  PORT: port,
  // COOKIE_SIGN_KEY: signKey
} = process.env;

const app = new Koa();
const router = new Router();

// 라우터 설정
router.get('/', (ctx) => {
  ctx.body = '홈';
});

router.use('/api', api.routes());

app.use(bodyParser());

app.use(jwtMiddleware);

// const sessionConfig = {
//   maxAge: 86400000
// }
// app.use(session(sessionConfig, app));
// app.keys = [signKey];

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, ()=>{
  console.log('listening to port', port);
});
