const index = require('../index');
const Recipe = index.mongoose.model('Recipe', {
  name: String,
  typeTags: [String],
  timeRequiredMinutes: {
    type: Number,
    required: true
  },
  complexity: {
    type: String,
    required: true
  },
  steps: {
    type: [String],
    required: true
  },
  specialConsiderations: {
    type: [String],
    required: true
  },
  imageUrl: {
    type: String,
    required: false
  },
  ingrediants: {
    type: [String],
    required: true
  },
  ingrediantQuantities: {
    type: [String],
    required: true
  }
});

module.exports = Recipe;