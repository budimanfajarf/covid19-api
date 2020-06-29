const covid19Api = require('../apis/covid19api.com');

calculatePercentOf = (number, ofNumber) => {
  return Math.round((number/ofNumber)*100);
};

generateNewData = (confirmed, recovered, deaths) => {
  console.log(confirmed, recovered, deaths);
  const closed = recovered+deaths;
  const active = confirmed-closed;
  const recoveredPercent = calculatePercentOf(recovered, closed);
  const deathsPercent = calculatePercentOf(deaths, closed);
  
  return { closed, active, recoveredPercent, deathsPercent };
}

getSummary = async (req, res, next) => {
  const { Global, Countries } = await covid19Api.getApiSummaryWithGlobalDate();
  const newGlobal = generateNewData(Global.TotalConfirmed, Global.TotalRecovered, Global.TotalDeaths);
  const newCountries = Countries.map((country) => {
    const newCountry = generateNewData(country.TotalConfirmed, country.TotalRecovered, country.TotalDeaths);
    return {
      country: country.Country,
      countryCode: country.CountryCode,
      slug: country.Slug,
      totalConfirmed: country.TotalConfirmed,
      totalRecovered: country.TotalRecovered,
      totalDeaths: country.TotalDeaths,
      totalClosed: newCountry.closed,
      totalActive: newCountry.active,
      totalRecoveredPercent: newCountry.recoveredPercent,
      totalDeathsPercent: newCountry.deathsPercent,
      date: country.Date      
    };
  });

  res.json({
    global: {
      totalConfirmed: Global.TotalConfirmed,
      totalRecovered: Global.TotalRecovered,
      totalDeaths: Global.TotalDeaths,
      totalClosed: newGlobal.closed,
      totalActive: newGlobal.active,
      totalRecoveredPercent: newGlobal.recoveredPercent,
      totalDeathsPercent: newGlobal.deathsPercent,
      date: Global.Date
    },
    countries: newCountries
  });
};

getGlobal = async (req, res, next) => {
  const { Global } = await covid19Api.getApiSummaryWithGlobalDate();
  const newGlobal = generateNewData(Global.TotalConfirmed, Global.TotalRecovered, Global.TotalDeaths);

  res.json({
    totalConfirmed: Global.TotalConfirmed,
    totalRecovered: Global.TotalConfirmed,
    totalDeaths: Global.TotalDeaths,
    totalClosed: newGlobal.closed,
    totalActive: newGlobal.active,
    totalRecoveredPercent: newGlobal.recoveredPercent,
    totalDeathsPercent: newGlobal.deathsPercent,
    date: Global.Date
  });
};

getCountries = async (req, res, next) => {
  const { Countries } = await covid19Api.getApiSummary();
  const newCountries = Countries.map((country) => {
    const newCountry = generateNewData(country.TotalConfirmed, country.TotalRecovered, country.TotalDeaths);
    return {
      country: country.Country,
      countryCode: country.CountryCode,
      slug: country.Slug,
      totalConfirmed: country.TotalConfirmed,
      totalRecovered: country.TotalRecovered,
      totalDeaths: country.TotalDeaths,
      totalClosed: newCountry.closed,
      totalActive: newCountry.active,
      totalRecoveredPercent: newCountry.recoveredPercent,
      totalDeathsPercent: newCountry.deathsPercent,
      date: country.Date      
    };
  });

  res.json(newCountries);
}

getSpecifyCountry = async (req, res, next) => {
  const slug = req.params.slug;
  const from = req.query.from || false;
  const to = req.query.to || false;
  let countries;

  if (from && to)
    countries = await covid19Api.getApiByCountryAllStatus(slug, from, to);
  else
    countries = await covid19Api.getApiDayOneAllStatus(slug);

  const newCountries = countries.map((country) => {
    const newCountry = generateNewData(country.Confirmed, country.Recovered, country.Deaths);
    return {
      // country: country.Country,
      // countryCode: country.CountryCode,
      // slug,
      confirmed: country.Confirmed,
      recovered: country.Recovered,
      deaths: country.Deaths,
      closed: newCountry.closed,
      active: newCountry.active,
      recoveredPercent: newCountry.recoveredPercent,
      deathsPercent: newCountry.deathsPercent,
      date: country.Date
    };
  });

  res.json({
    country: countries[0].Country,
    countryCode: countries[0].CountryCode,
    slug,
    totalConfirmed: countries[countries.length - 1].Confirmed,
    totalRecovered: countries[countries.length - 1].Recovered,
    totalDeaths: countries[countries.length - 1].Deaths,        
    totalClosed: newCountries[newCountries.length - 1].closed,
    totalActive: newCountries[newCountries.length - 1].active,
    totalRecoveredPercent: newCountries[newCountries.length - 1].recoveredPercent,
    totalDeathsPercent: newCountries[newCountries.length - 1].deathsPercent,                
    date: countries[countries.length - 1].Date,
    history: newCountries
  });
}

module.exports.getSummary = getSummary;
module.exports.getGlobal = getGlobal;
module.exports.getCountries = getCountries;
module.exports.getSpecifyCountry = getSpecifyCountry;