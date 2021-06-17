const fs = require('fs');

let files = fs.readdirSync(__dirname);

function initRoutes(router) {
  for (let file of files) {
    if (file !== 'index.js' && file !== 'util.js') {
      let nameNoExtension = file.split('.')[0];
      let currentRoute = require(`./${nameNoExtension}`);
      if (currentRoute.get) {
        router.get(...currentRoute.params);
      } else {
        router.post(...currentRoute.params);
      }
    }
  }
}

module.exports = {
  initRoutes,
};
