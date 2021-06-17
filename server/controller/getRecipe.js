const { Recipe } = require('../db/models');

async function getRecipe(req, res) {
  const { id } = req.body;
  if (!id) {
    return res.status(400).send({ error: 'You must provide an ID' });
  }
  let foundRecipe = await Recipe.findById(id).select('-_id -__v').exec();
  if (foundRecipe) {
    return res.status(200).send(foundRecipe);
  }
  return res.status(200).send({});
}

module.exports = {
  get: true,
  params: ['/recipe', getRecipe],
};
