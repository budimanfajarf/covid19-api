const express = require('express');
const router = express.Router();
const covid19Controller = require('../controllers/covid19');

router.get('/', covid19Controller.getCountries); 
router.get('/:slug', covid19Controller.getSpecifyCountry); 

module.exports = router;