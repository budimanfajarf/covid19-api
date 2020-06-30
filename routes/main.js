const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const { getSummary, getGlobal } = require('../ext-api/covid19api.com/main');

router.get('/', (req, res, next) => {
  fs.readFile(path.join(__dirname, '../info.json'), 'utf8', (err, result) => {
    if (err)
      next(err);
    else {
      res.json(JSON.parse(result));      
    }
  });  
});

router.get('/summary', async(req, res, next) => {
  const summary = await getSummary();
  res.json(summary);
});

router.get('/global', async (req, res, next) => {
  const global = await getGlobal();
  res.json(global);
});

module.exports = router;
