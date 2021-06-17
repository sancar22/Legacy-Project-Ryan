const { Recipe } = require('../db/models');
const recipeParser = require('../recipeParser');

async function postRecipeFromUrl(req, res) {
  const { url } = req.body;

  try {
    let recipeData = await recipeParser(url);
    let currentRecipe = await Recipe.find({ name: recipeData.name });
    if (currentRecipe.length) {
      return res.status(400).send('Recipe already exists');
    }
    let newRecipe = new Recipe(recipeData);
    await newRecipe.save();

    return res.status(201).end();
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: `Unable to parse from [${url}]` });
  }
}

module.exports = {
  get: false,
  params: ['/recipe/url', postRecipeFromUrl],
};
