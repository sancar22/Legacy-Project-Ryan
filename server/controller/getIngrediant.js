const { Ingrediant } = require('../db/models');

async function getIngrediant (req, res) {
  const { id } = req.body;
  if (!id) {
    return res.status(400).send({error: 'You must provide an ID'});
  }
  let foundIngrediant = await Ingrediant.findById(id)
    .select('-_id -__v')
    .exec();
  if (foundIngrediant) {
    return res.status(200).send({
      name: foundIngrediant.name,
      pictureURL: foundIngrediant.pictureURL,
      minimumQuantity: foundIngrediant.minimumQuantityAtStore
    });
  }
  return res.status(200).send({});
}


module.exports = {
  get: true,
  params: ['/ingrediant', getIngrediant]
}