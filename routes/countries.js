const express = require('express');
const router = express.Router();
const { getCountries, getCountry } = require('../ext-api/covid19api.com/main');

router.get('/', async (req, res, next) => {
  const countries = await getCountries();
  res.json(countries);
});
 
router.get('/:slug/:histories', async (req, res, next) => {
  const slug = req.params.slug;
  const from = req.query.from || false;
  const to = req.query.to || false;
  const country = await getCountry(slug, from, to);
  res.json(country);
});

router.get('/:slug', async (req, res, next) => {
  const slug = req.params.slug;
  const from = req.query.from || false;
  const to = req.query.to || false;
  const country = await getCountry(slug, from, to);
  res.json(country);
}); 

module.exports = router;
