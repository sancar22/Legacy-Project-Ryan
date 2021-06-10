const { Recipe, Ingrediant } = require('../db/models');

async function getIngrediants (ingrediantIds) {
  let ingrediants = Ingrediant.find({
    '_id': {
      $in: ingrediantIds
    }
  }).exec();
  console.log(ingrediants);
  return [];
}

async function getRecipes (recipeIds) {
  let recipes = Recipe.find({
    '_id': {
      $in: recipeIds
    }
  }).exec();
  for (let recipe of recipes) {
    recipe.ingrediantList = getIngrediants(recipe.ingrediants);
  }
  console.log(recipes);
  return [];
}

module.exports = {
  getIngrediants,
  getRecipes
};