const { Recipe } = require('../db/models');

async function postRecipe (req, res) {
  const { name, typeTags, timeRequiredMinutes, complexity, steps, specialConsiderations, imageUrl, ingrediants, ingrediantQuantities } = req.body;
  
  try {
    let newRecipe = new Recipe({ name, typeTags, timeRequiredMinutes, complexity, steps, specialConsiderations, imageUrl, ingrediants, ingrediantQuantities });
    await newRecipe.save();
    
    return res.status(201).end();
  } catch (e) {
    res.status(400).send({error: 'Missing fields in recipe upload'});
  }
}


module.exports = {
  get: false,
  params: ['/recipe', postRecipe]
}