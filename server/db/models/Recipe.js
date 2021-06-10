const index = require('../index');
const Recipe = index.mongoose.model('Recipe', {
  timeRequiredMinutes: {
    type: Number,
    required: true
  },
  Complexity: {
    type: String,
    required: true
  }
});

module.exports = Recipe;