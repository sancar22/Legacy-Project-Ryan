const { Recipe, Ingrediant } = require('../db/models');

async function getIngrediants(ingrediantIds) {
  let ingrediants = await Ingrediant.find({
    _id: {
      $in: ingrediantIds,
    },
  }).exec();
  console.log(ingrediants);
  return ingrediants;
}

async function getRecipes(recipeIds) {
  let recipes = await Recipe.find({
    _id: {
      $in: recipeIds,
    },
  }).exec();
  console.log(recipes);
  for (let recipe of recipes) {
    recipe.ingrediantList = getIngrediants(recipe.ingrediants);
  }
  return recipes;
}

module.exports = {
  getIngrediants,
  getRecipes,
};
