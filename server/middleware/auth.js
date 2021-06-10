const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { InvalidToken } = require('../db/models'); 

module.exports = async (req, res, next) => {
  let authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(400).send({error: 'You must include a auth header'});
  }
  let token = authHeader.split(' ')[1];
  try {
    let tokenData = jwt.verify(token, process.env.JWT_SECRET);
    let invalidToken = await InvalidToken.findOne({token}).exec();
    if (invalidToken) throw new Error();
    req.user = tokenData.userID;
    next();
  } catch (e) {
    res.status(403).send({error: 'You are not authorized for this'});
  }
};