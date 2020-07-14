require('dotenv').config();

const crypto = require('crypto');

const { SECRET_KEY: secretKey } = process.env;

const hashed = (password) => crypto.createHmac('sha256', secretKey).update(password).digest('hex');

module.exports = hashed;
