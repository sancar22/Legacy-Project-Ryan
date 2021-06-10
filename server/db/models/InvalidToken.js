const index = require('../index');
const InvalidToken = index.mongoose.model('InvalidToken', {
  token: String
});

module.exports = InvalidToken;