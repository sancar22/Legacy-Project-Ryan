const { Ingrediant } = require('../db/models');

async function postIngrediant(req, res) {
  const { name, pictureUrl, minimumQuantityAtStore } = req.body;

  if (!name || !minimumQuantityAtStore)
    return res
      .status(400)
      .send({ error: 'You need to include a name and minumum quantity' });

  let newIngrediant = new Ingrediant({
    name,
    pictureUrl,
    minimumQuantityAtStore,
  });
  await newIngrediant.save();

  return res.status(201).end();
}

module.exports = {
  get: false,
  params: ['/ingrediant', postIngrediant],
};
