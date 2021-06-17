const { User } = require('../db/models');
const auth = require('../middleware/auth');

const util = require('./util');

async function getUser(req, res) {
  let userID = req.user;

  let user = await User.findById(userID).exec();

  let recipes = util.getRecipes(user.savedRecipes);

  return res.status(200).send({
    savedRecipes: recipes,
    currentIngrediants: user.currentIngrediants,
    currentIngrediantQuantities: user.currentIngrediantQuantities,
  });
}

module.exports = {
  get: true,
  params: ['/profile', auth, getUser],
};
