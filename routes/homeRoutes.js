const express = require('express');
const homeRouteController = require('../controllers/homeRouteController');

const router = express.Router();

router.get('/', homeRouteController);

module.exports = router;
