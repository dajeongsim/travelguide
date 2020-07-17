const db = require('lib/db');
const hashed = require('lib/crypto');

exports.register = async (ctx) => {
  const { id, password, name, email } = ctx.request.body;
  const hashedPw = hashed(password);

  try {
    const [rows] = await db.query(`INSERT INTO user(userMemId, userPw, userName, userEmail) VALUES ('${id}', '${hashedPw}', '${name}', '${email}')`);
  } catch (e) {
    ctx.throw(e);
  }
  ctx.body = {success: true};
}

exports.checkIdExists = async (ctx) => {
  const { id } = ctx.params;

  try {
    const [exists] = await db.query(`SELECT * from user WHERE userMemId='${id}'`);

    ctx.body = exists[0] ? true : false;
  } catch (e) {
    ctx.throw(e);
  }
}

exports.checkEmailExists = async (ctx) => {
  const { email } = ctx.params;

  try {
    const [exists] = await db.query(`SELECT * from user WHERE userEmail='${email}'`);

    ctx.body = exists[0] ? true : false;
  } catch (e) {
    ctx.throw(e);
  }
}
