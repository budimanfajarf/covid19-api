const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({
    baseUrl : "https://api.covid19.budidev.com" 
  })
});

module.exports = router;
