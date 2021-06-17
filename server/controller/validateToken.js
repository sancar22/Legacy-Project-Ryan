const auth = require('../middleware/auth');

async function validateToken(req, res) {
  return res.status(200).end();
}

module.exports = {
  get: true,
  params: ['/validate', auth, validateToken],
};
