const mongoose = require('mongoose');

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => console.log('DB connected'),
    (err) => console.log(err)
  );

module.exports = {
  mongoose,
};
