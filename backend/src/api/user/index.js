const Router = require('koa-router');
const userCtrl = require('./user.ctrl');

const user = new Router();

user.post('/register', userCtrl.register);
user.get('/check/id/:id', userCtrl.checkIdExists);
user.get('/check/email/:email', userCtrl.checkEmailExists);

module.exports = user;
