const { Recipe, Ingrediant } = require('../db/models');

async function getIngrediants (ingrediantIds) {
  let arrayString = `[${ingrediantIds.join(',')}]`;
  let ingrediants = Ingrediant.$where(`${arrayString}.includes(this._id)`).exec();
  console.log(ingrediants);
  return [];
}

async function getRecipes (recipeIds) {
  let arrayString = `[${recipeIds.join(',')}]`;
  let recipes = Recipe.$where(`${arrayString}.includes(this._id)`).exec();
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