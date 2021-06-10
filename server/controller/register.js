const { User } = require('../db/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function register (req, res) {
  let { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({error: 'Missing username or password'});
  }

  let currentUser = await User.findOne({username}).exec();
  if (currentUser) {
    return res.status(401).send({error: 'User already exists'});
  }
  let hashedPassword = bcrypt.hashSync(password, 10);
  let newUser = new User({username, password: hashedPassword, savedRecipes: [],
    currentIngrediants: [], currentIngrediantQuantities: []});
  await newUser.save();
  let token = jwt.sign({userID: newUser._id}, process.env.JWT_SECRET, {expiresIn: '2h'});
  return res.status(201).send({token});
}


module.exports = {
  get: false,
  params: ['/register', register]
}