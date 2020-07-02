const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  fs.readFile(path.join(__dirname, '../info.json'), 'utf8', (err, result) => {
    if (err)
      next(err);
    else {
      res.json(JSON.parse(result));      
    }
  });  
});

module.exports = router;
