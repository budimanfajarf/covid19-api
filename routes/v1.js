const express = require('express');
const router = express.Router();
const { getCountries, getCountry } = require('../ext-api/covid19api.com/main');
const { getSummary, getGlobal } = require('../ext-api/covid19api.com/main');

router.get('/', (req, res, next) => {
  res.json({
    'summary': {
      path: '/v1/summary',
      description: 'Get summary data of global & countries'
    },
    'global': {
      path: '/v1/global',
      description: 'Get global world data'
    },
    'countries': {
      path: '/v1/countries',
      description: 'Get available countries slug'
    },
    'country': {
      path: '/v1/countries/:slug',
      description: 'Get a country data with history'
    }             
  });
});

router.get('/all', async (req, res, next) => {
  const all = await getGlobal();
  res.json(all);
});

router.get('/summary', async(req, res, next) => {
  const summary = await getSummary();
  res.json(summary);
});

router.get('/global', async (req, res, next) => {
  const global = await getGlobal();
  res.json(global);
});

router.get('/countries', async (req, res, next) => {
  const countries = await getCountries();
  res.json(countries);
});
 
router.get('/countries/:slug', async (req, res, next) => {
  const slug = req.params.slug;
  const country = await getCountry(slug);
  res.json(country);
}); 

module.exports = router;
