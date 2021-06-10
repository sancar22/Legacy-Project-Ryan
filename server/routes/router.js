const router = require('express').Router();
const controller = require('../controller');
controller.initRoutes(router);

module.exports = router;