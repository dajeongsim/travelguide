const db = require('lib/db');
const { generateToken, decodeToken } = require('lib/token');
const hashed = require('lib/crypto');

exports.login = async (ctx) => {
  const { id, password } = ctx.request.body;
  const hashedPw = hashed(password);
  let error, token;

  try {
    const [userid] = await db.query(`SELECT * FROM user WHERE userMemId='${id}'`);

    if (userid[0]) {
      // id 존재
      if (userid[0].userPw===hashedPw) {
        // id, pw 일치 -> 로그인 성공
        token = await generateToken({userId: userid[0].userId, userMemId: id});

        ctx.cookies.set('access_token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
        ctx.body = { userId: userid[0].userId, userMemId: id, success: true};
      } else {
        // pw 불일치
        error = 2;
      }
    } else {
      // id 미존재
      error = 1;
    }

    if (error) {
      ctx.status = 401;
      ctx.body = {error}
    }
  } catch (e) {
    ctx.throw(e);
  }
}

exports.naverlogin = (ctx) => {

}

exports.googlelogin = (ctx) => {

}

exports.kakaologin = (ctx) => {

}

exports.logout = (ctx) => {
  ctx.cookies.set('access_token');
  ctx.status = 204; // No Content
}

exports.checkLogin = (ctx) => {
  if(!ctx.request.user) {
    ctx.status = 204;
  } else {
    ctx.body = ctx.request.user;
  }
}
