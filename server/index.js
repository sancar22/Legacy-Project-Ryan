const Express = require('express');
require('dotenv').config();
const router = require('./routes/router');
const models = require('./db/models');

const app = new Express();

app.use(router);

app.use('*', (req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(process.env.PORT, () =>  {
  console.log(`Server listening on http://localhost:${process.env.PORT}`);
});