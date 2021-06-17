const Express = require('express');
require('dotenv').config();
const router = require('./routes/router');

const app = new Express();

app.use(Express.json());

app.use(router);

console.log('Server starting');

app.use('*', (req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on http://localhost:${process.env.PORT}`);
});
