const express = require('express');
const router = express.Router();
const { getSummary, getGlobal, getCountries, getCountry, getCountryHistories } = require('../ext-api/covid19api.com/main');

router.get('/', (req, res, next) => {
  res.json({
    'Summary': {
      path: '/v1/summary',
      description: 'Get summary data of global & countries'
    },
    'Global': {
      path: '/v1/global',
      description: 'Get global world data'
    },
    'Countries': {
      path: '/v1/countries',
      description: 'Get available countries slug'
    },
    'Country': {
      path: '/v1/countries/:slug',
      description: 'Get a country data'
    },
    'Country Histories': {
      path: '/v1/countries/:slug/histories',
      description: 'Get a country histories data from day one confirmed cases'
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

router.get('/countries/:slug/histories', async (req, res, next) => {
  const slug = req.params.slug;
  const histories = await getCountryHistories(slug);
  res.json(histories);
});

module.exports = router;
