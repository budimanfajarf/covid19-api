getInfo = (req, res, next) => {
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
}

module.exports.getInfo = getInfo;