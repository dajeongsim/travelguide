require('dotenv').config();

const jwt = require('jsonwebtoken');

const { JWT_SECRET: jwtSecret } = process.env;

function generateToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, jwtSecret, { expiresIn: '1d' }, (error, token) => {
        if(error) reject(error);

        resolve(token);
    });
  });
};

function decodeToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, (error, decoded) => {
      if(error) reject(error);
      
      resolve(decoded);
    })
  })
}

const jwtMiddleware =  async (ctx, next) => {
  const token = ctx.cookies.get('access_token');

  if(!token) return next();

  try {
    const decoded = await decodeToken(token);

    ctx.request.user = decoded;
  } catch (e) {
    ctx.request.user = null;
  }

  return next();
}

exports.generateToken = generateToken;
exports.decodeToken = decodeToken;
exports.jwtMiddleware = jwtMiddleware;
