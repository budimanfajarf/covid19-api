const express = require('express');
const router = express.Router();
const { getCountries, getDegetDetailCountry } = require('../ext-api/covid19api.com/main');

router.get('/', async (req, res, next) => {
  const countries = await getCountries();
  res.json(countries);
});
 
router.get('/:slug', async (req, res, next) => {
  const slug = req.params.slug;
  const from = req.query.from || false;
  const to = req.query.to || false;
  const specifyCountry = await getDetailCountry(slug, from, to);
  res.json(specifyCountry);
}); 

module.exports = router;