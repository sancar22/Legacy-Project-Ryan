const fs = require('fs');

let files = fs.readdirSync(__dirname);

const exportValue = {};
for (let file of files) {
  if (file === 'index.js') continue;
  let nameNoExtension = file.split('.')[0];
  console.log(nameNoExtension);
  exportValue[nameNoExtension] = require(`./${nameNoExtension}`);
}

module.exports = exportValue;