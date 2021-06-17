const index = require('../index');

const Recipe = index.mongoose.model('Recipe', {
  name: {
    type: String,
    required: true,
  },
  tags: [String],
  timeRequiredMinutes: {
    type: Number,
    required: true,
    default: -1,
  },
  steps: {
    type: [String],
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  ingrediants: {
    type: [String],
    required: true,
  },
  yields: String,
  parsedFrom: String,
});

module.exports = Recipe;
