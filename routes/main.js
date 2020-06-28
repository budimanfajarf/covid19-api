const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main');
const covid19Controller = require('../controllers/covid19');

router.get('/', mainController.info);
router.get('/summary', covid19Controller.getSummary);
router.get('/global', covid19Controller.getGlobal);

module.exports = router;
