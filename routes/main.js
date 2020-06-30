const express = require('express');
const router = express.Router();
const { getSummary, getGlobal } = require('../ext-api/covid19api.com/main');

router.get('/', (req, res, next) => {
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

router.get('/summary', async(req, res, next) => {
  const summary = await getSummary();
  res.json(summary);
});

router.get('/global', async (req, res, next) => {
  const global = await getGlobal();
  res.json(global);
});

module.exports = router;
