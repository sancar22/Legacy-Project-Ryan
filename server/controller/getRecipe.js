const { Recipe, Ingrediant } = require('../db/models');
const util = require('./util');

async function getRecipe (req, res) {
  const { id } = req.body;
  if (!id) {
    return res.status(400).send({error: 'You must provide an ID'});
  }
  let foundRecipe = await Recipe.findById(id)
    .select('-_id -__v')
    .exec();
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
  params: ['/recipe', getRecipe]
}