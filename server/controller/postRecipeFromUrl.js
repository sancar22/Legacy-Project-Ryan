const { Recipe } = require('../db/models');
const recipeParser = require('../recipeParser');

async function postRecipeFromUrl (req, res) {
  const { url } = req.body;
  
  try {
    let recipeData = await recipeParser.parse(url);
    let newRecipe = new Recipe(recipeData);
    await newRecipe.save();
    
    return res.status(201).end();
  } catch (e) {
    res.status(400).send({error: `Unable to parse from [${url}]`, exception: e});
  }
}


module.exports = {
  get: false,
  params: ['/recipe/url', postRecipeFromUrl]
}