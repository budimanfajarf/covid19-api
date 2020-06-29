const covid19Api = require('../apis/covid19api.com');

calculatePercentOf = (number, ofNumber) => {
  return Math.round((number/ofNumber)*100);
};

remapCovidData = (data, isCases, isPercent, isNew) => {
  let covidData = {};
  const { Country, CountryCode, Slug, Date } = data;
  const { TotalConfirmed, TotalDeaths, TotalRecovered } = data;

  if (Country)
    covidData = Object.assign(covidData, { Country, CountryCode, Slug });

  covidData = Object.assign(covidData, { TotalConfirmed, TotalRecovered, TotalDeaths });

  if (isCases == true || isPercent == 'true') {
    const TotalClosedCases = TotalDeaths+TotalRecovered;
    const TotalActiveCases = TotalConfirmed-TotalClosedCases;
    covidData = Object.assign(covidData, { TotalClosedCases, TotalActiveCases });
  }

  if (isPercent == true || isPercent == 'true') {
    const TotalRecoveredPercent = calculatePercentOf(TotalRecovered, (TotalDeaths+TotalRecovered));
    const TotalDeathsPercent = calculatePercentOf(TotalDeaths, (TotalDeaths+TotalRecovered));     
    covidData = Object.assign(covidData, { TotalRecoveredPercent, TotalDeathsPercent });    
  }

  if (isNew == true || isPercent == 'true') {
    const { NewConfirmed, NewRecovered, NewDeaths } = data;
    covidData = Object.assign(covidData, { NewConfirmed, NewRecovered, NewDeaths });
  }

  if (Date)
    covidData = Object.assign(covidData, { Date });

  return covidData;
}

getSummary = async (req, res, next) => {
  const { Global, Countries } = await covid19Api.getApiSummaryWithGlobalDate();

  const newGlobal = remapCovidData(Global, true, true, false);  
  const newCountries = Countries.map((country) => {
    const newCountry = remapCovidData(country, true, true, false);
    return newCountry;
  });

  res.json({
    Global: newGlobal,
    Countries: newCountries
  });
};

getGlobal = async (req, res, next) => {
  const { Global } = await covid19Api.getApiSummaryWithGlobalDate();
  const newGlobal = remapCovidData(Global, req.query.cases, req.query.percent, req.query.new);

  res.json(newGlobal);  
};

getCountries = async (req, res, next) => {
  const { Countries } = await covid19Api.getApiSummary();
  const newCountries = Countries.map((country) => {
    const newCountry = remapCovidData(country, req.query.cases, req.query.percent, req.query.new);
    return newCountry;
  });

  res.json(newCountries);
}

getSpecifyCountry = async (req, res, next) => {
  const { Countries } = await covid19Api.getApiSummary();
  const slug = req.params.slug;
  const filteredCountries = Countries.filter((country) => {
    return country.Slug == slug;
  });
  const newCountry = remapCovidData(filteredCountries[0], req.query.cases, req.query.percent, req.query.new);

  res.json(newCountry);
}

module.exports.getSummary = getSummary;
module.exports.getGlobal = getGlobal;
module.exports.getCountries = getCountries;
module.exports.getSpecifyCountry = getSpecifyCountry;