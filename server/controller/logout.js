const { InvalidToken } = require('../db/models');
const auth = require('../middleware/auth');

async function logout(req, res) {
  let token = req.headers.authorization.split(' ')[1];
  let newInvalidToken = new InvalidToken({ token });
  await newInvalidToken.save();
  return res.status(200).end();
}

module.exports = {
  get: true,
  params: ['/logout', auth, logout],
};
