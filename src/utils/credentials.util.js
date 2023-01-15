const bcrypt = require('bcrypt');

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const generateHash = (text) => {
  return bcrypt.hashSync(text, salt);
}

const compareTextAndHash = (text, hash) => {
  return bcrypt.compareSync(text, hash);
}

const generateRandomString = (num) => {
  return [...Array(num)].map(() => {
    const randomNum = ~~(Math.random() * 36);
    return randomNum.toString(36);
  })
  .join('')
  .toUpperCase();
}

module.exports = {
  generateHash,
  compareTextAndHash,
  generateRandomString
}