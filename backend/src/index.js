require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mysql = require('mysql');
const session = require('koa-session');

const api = require('./api');

// DB
const {
  PORT: port,
  MYSQL_CONN: mysqlConn,
  COOKIE_SIGN_KEY: signKey
} = process.env;

const connection = mysql.createConnection(JSON.parse(mysqlConn));

connection.connect(err=>{
  if(err) return console.log(err);
  console.log('DB Connected');
});

const app = new Koa();
const router = new Router();

router.use('/api', api.routes());

app.use(bodyParser());

const sessionConfig = {
  maxAge: 86400000
}
app.use(session(sessionConfig, app));
app.keys = [signKey];

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, ()=>{
  console.log('listening to port', port);
});
