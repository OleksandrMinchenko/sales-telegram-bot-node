const jwt = require('jsonwebtoken');
require('dotenv').config();

const SALT = process.env.SALT;

const decode = async data => {
  console.log(data);
  const token = jwt.sign(data, SALT);
  console.log(token);
};

const encode = async token => {
  console.log(token);

  const data = jwt.decode(token, SALT);
  console.log(data);
};

module.exports = {
  decode,
  encode,
};
