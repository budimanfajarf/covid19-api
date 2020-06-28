const express = require('express');
const router = express.Router();
const covid19Api = require('../apis/covid19api');

router.get('/', async (req, res, next) => {
  const countries = await covid19Api.getCountries();
  res.send(countries);
}); 

module.exports = router;