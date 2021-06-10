const mongoose = require('mongoose');

let url = process.env.DB_URI;
console.log(url);
url = url.replace('{password}', process.env.PASSWORD);

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('DB connected'), err => console.log(err));

module.exports = {
  mongoose
};