const express = require('express');
const router = express.Router();
const covid19Controller = require('../controllers/covid19');

router.get('/', covid19Controller.getCountries); 
router.get('/:slug', async (req, res, next) => {
  const slug = req.params.slug;
  const from = req.query.from || false;
  const to = req.query.to || false;
  const specifyCountry = await covid19Controller.getSpecifyCountry(slug, from, to);
  res.json(specifyCountry);
}); 

module.exports = router;