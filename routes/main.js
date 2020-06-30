const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main');
const covid19Controller = require('../controllers/covid19');

router.get('/', mainController.getInfo);
router.get('/summary', covid19Controller.getSummary);
router.get('/global', async (req, res, next) => {
  const global = await covid19Controller.getGlobal();
  res.json(global);
});

module.exports = router;
