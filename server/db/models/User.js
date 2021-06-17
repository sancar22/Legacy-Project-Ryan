const index = require('../index');

const User = index.mongoose.model('User', {
  username: String,
  password: String,
  savedRecipes: [String],
  currentIngrediants: [String],
  currentIngrediantQuantities: [String],
});

module.exports = User;
