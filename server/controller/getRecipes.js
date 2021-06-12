const { Recipe, Ingrediant } = require('../db/models');
const util = require('./util');

async function getRecipe (req, res) {
    let limit = req.params.limit;
    if (!limit || limit > 50) limit = 50;
    let foundRecipes = await Recipe.find()
        .select('_id -__v')
        .limit(limit)
        .exec();
        console.log(foundRecipes);
    if (foundRecipe) {
        let ingrediants = await util.getIngrediants(foundRecipe.ingrediants);
        return res.status(200).send({
        name: foundRecipe.name,
        timeRequiredMinutes: foundRecipe.timeRequiredMinutes,
        complexity: foundRecipe.complexity,
        step: foundRecipe.steps,
        specialConsiderations: foundRecipe.specialConsiderations,
        imageUrl: foundRecipe.imageUrl,
        ingrediants,
        ingrediantQuantities: foundRecipe.ingrediantQuantities,
        tags: foundRecipe.typeTags
        });
    }
    return res.status(200).send({});
}


module.exports = {
  get: true,
  params: ['/recipes', getRecipes]
}