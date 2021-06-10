const { User } = require('../db/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function login (req, res) {
  try {
    let { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send({error: 'Missing username or password'});
    }

    let currentUser = await User.findOne({username}).exec();
    if (!currentUser || !bcrypt.compareSync(password, currentUser.password)) {
      return res.status(401).send({error: 'Username or password is incorrect'});
    }
    let token = jwt.sign({userID: currentUser._id}, process.env.JWT_SECRET, {expiresIn: '2h'});
    return res.status(201).send({token});
  } catch (e) {
    console.log(e);
    return res.status(500).send({error: 'Internal error, see logs'});
  }
  
}


module.exports = {
  get: false,
  params: ['/login', login]
}