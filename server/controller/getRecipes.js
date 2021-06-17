const { Recipe } = require('../db/models');

async function getRecipes(req, res) {
  let limit = Number(req.query.limit);
  let searchObject = {};
  if (req.query.next) {
    searchObject = {
      _id: {
        $gt: req.query.next,
      },
    };
  }
  if (!limit || Number.isNaN(limit) || limit > 50) limit = 50;
  if (limit < 1) limit = 1;
  limit = Math.floor(limit);
  let foundRecipes = await Recipe.find(searchObject)
    .select('-__v')
    .limit(limit)
    .exec();
  let result = {};
  for (let recipe of foundRecipes) {
    result[recipe.name] = {
      name: recipe.name,
      timeRequiredMinutes: recipe.timeRequiredMinutes,
      complexity: recipe.complexity,
      step: recipe.steps,
      specialConsiderations: recipe.specialConsiderations,
      imageUrl: recipe.imageUrl,
      ingrediantQuantities: recipe.ingrediantQuantities,
      tags: recipe.typeTags,
      ingrediants: recipe.ingrediants,
    };
  }

  if (foundRecipes.length === limit) {
    result.next = foundRecipes[foundRecipes.length - 1]._id;
  }
  return res.status(200).send(result);
}

module.exports = {
  get: true,
  params: ['/recipes', getRecipes],
};
