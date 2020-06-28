const express = require('express');
const router = express.Router();
const covid19Api = require('../apis/covid19api')

router.get('/', async (req, res, next) => {
  res.json({
    Formula: {
      TotalConfirmed: "Default",
      TotalDeaths: "Default",
      TotalRecovered: "Default",
      TotalClosedCases: "TotalDeaths+TotalRecovered",
      TotalActiveCases: "TotalConfirmed-TotalClosedCases",      
      PercentDeaths: "round((TotalDeaths/TotalClosedCases)*100)",
      PercentRecovered: "round((TotalRecovered/TotalClosedCases)*100)",        
    }
  });
});

router.get('/summary', async (req, res, next) => {
  const summary = await covid19Api.getSummary();
  res.json(summary);
});

router.get('/global', async (req, res, next) => {
  const global = await covid19Api.getGlobal();
  res.json(global);
});

module.exports = router;
