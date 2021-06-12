const { Recipe, Ingrediant } = require('../db/models');
const util = require('./util');

async function getRecipes (req, res) {
    let limit = req.params.limit;
    let searchObject = {};
    if (req.params.next) {
        searchObject = {
            _id: {
                $gt: next
            }
        };
    }
    if (!limit || limit > 50) limit = 50;
    let foundRecipes = await Recipe.find(searchObject)
        .select('-__v')
        .limit(limit)
        .exec();
        console.log(foundRecipes);
    let result = {};
    for (let recipe of foundRecipes) {
        result[recipe.name] = {
            name: foundRecipe.name,
            timeRequiredMinutes: recipe.timeRequiredMinutes,
            complexity: recipe.complexity,
            step: recipe.steps,
            specialConsiderations: recipe.specialConsiderations,
            imageUrl: recipe.imageUrl,
            ingrediantQuantities: recipe.ingrediantQuantities,
            tags: recipe.typeTags,
            ingrediants: recipe.ingrediants
        };
    }

    if (foundRecipes.length === limit) {
        result.next = foundRecipes[foundRecipes.length - 1]._id;
    }
    return res.status(200).send({});
}


module.exports = {
  get: true,
  params: ['/recipes', getRecipes]
}