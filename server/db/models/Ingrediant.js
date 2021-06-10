const index = require('../index');
const Ingrediant = index.mongoose.model('Ingrediant', {
  name: String,
  pictureURL: {
    type: String,
    required: false
  },
  minimumQuantityAtStore: String
});