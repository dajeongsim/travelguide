require('dotenv').config();
const db = require('lib/db');
const { generateToken, decodeToken } = require('lib/token');
const hashed = require('lib/crypto');

exports.login = async (ctx) => {
  const { id, password } = ctx.request.body;
  const hashedPw = hashed(password);
  let error, token;

  try {
    const [idExists] = await db.query(`SELECT * FROM user WHERE userMemId='${id}'`);

    if (idExists[0]) {
      // id 존재
      if (idExists[0].userPw===hashedPw) {
        // id, pw 일치 -> 로그인 성공
        token = await generateToken({userId: idExists[0].userId, userMemId: id});

        ctx.cookies.set('access_token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
        ctx.body = { userId: idExists[0].userId, userMemId: id, success: true};
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

exports.naverLogin = async (ctx, next) => {
  // access_token 받아오기
  const { CLIENT_ID: clientId, CLIENT_SECRET: clientSecret } = process.env;
  var redirectURI = encodeURI('http://localhost:3000/naverLogin');
  const { code, state } = ctx.query;

  var api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
   + clientId + '&client_secret=' + clientSecret + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + state;

  var request = require('request-promise');
  var options = {
      url: api_url,
      headers: {'X-Naver-Client-Id':clientId, 'X-Naver-Client-Secret': clientSecret}
   };

  await request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      ctx.set('Content-Type', 'text/html;charset=utf-8');
      ctx.status = 200;
    } else {
      ctx.status = response.statusCode;
      console.log('error = ' + response.statusCode);
    }
  }).then(async (res) => {
    // memberInfo 가져오기
    var token = JSON.parse(res).access_token;
    var header = "Bearer " + token; // Bearer 다음에 공백 추가
    var api_url_mem = 'https://openapi.naver.com/v1/nid/me';
    var options_mem = {
      url: api_url_mem,
      headers: {'Authorization': header}
    };

    await request.get(options_mem, async (error, response, body) => {
      if (!error && response.statusCode == 200) {
        ctx.request.naverLoggedInfo = JSON.parse(body).response;
      } else {
        console.log('error');
        if(response != null) {
          ctx.status = response.statusCode;
          console.log('error = ' + response.statusCode);
        }
      }
    });
  });
  return next();
}

exports.checkNaverLogin = async (ctx) => {
  const {id, email, name} = ctx.request.naverLoggedInfo;

  try {
    const [idExists] = await db.query(`SELECT * FROM user WHERE userMemId='${id}' AND userSnsType='N'`);

    const token = await generateToken({userId: idExists[0].userId, userMemId: id});

    ctx.cookies.set('access_token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
    
    if (!idExists[0]) {
      // id 미존재시 INSERT
      const [test] = await db.query(`INSERT INTO user(userMemId, userPw, userName, userEmail, userSnsType) VALUES ('${id}', 'N', '${name}', '${email}', 'N')`);

      ctx.body = {userId: test.insertId, userMemId: id};
      return ;
    }

    ctx.body = {userId: idExists[0].userId, userMemId: id};
  } catch (e) {
    ctx.throw(e);
  }
}

exports.googleLogin = (ctx) => {

}

exports.kakaoLogin = (ctx) => {

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
