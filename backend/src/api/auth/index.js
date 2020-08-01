const Router = require('koa-router');
const authCtrl = require('./auth.ctrl');

const auth = new Router();

auth.post('/login', authCtrl.login);
auth.get('/nLogin', authCtrl.naverLogin, authCtrl.checkNaverLogin);
// auth.post('/gLogin', authCtrl.googleLogin);
// auth.post('/kLogin', authCtrl.kakaoLogin);
auth.post('/logout', authCtrl.logout);
auth.get('/checkLogin', authCtrl.checkLogin);

module.exports = auth;
