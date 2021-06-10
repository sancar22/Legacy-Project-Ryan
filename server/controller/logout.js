const { InvalidToken } = require('../db/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

async function logout (req, res) {

  let token = req.headers['authorization'].split(' ')[1];
  let newInvalidToken = new InvalidToken({token: token});
  await newInvalidToken.save();
  return res.status(200).end();
}


module.exports = {
  get: true,
  params: ['/logout', auth, logout]
}