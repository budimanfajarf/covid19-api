const covid19Api = require('../apis/covid19api.com');

calculatePercentOf = (number, ofNumber) => {
  return Math.round((number/ofNumber)*100);
};

appendData = (confirmed, deaths, recovered) => {
  const ClosedCases = deaths+recovered;
  const ActiveCases = confirmed-ClosedCases;
  const PercentRecovered = calculatePercentOf(recovered, ClosedCases);
  const PercentDeaths = calculatePercentOf(deaths, ClosedCases);  
  return { ClosedCases, ActiveCases, PercentRecovered, PercentDeaths };  
}

remapData = (data) => {
  const { Country, CountryCode, Slug, Date } = data;
  const { TotalConfirmed, TotalDeaths, TotalRecovered } = data;
  const { ClosedCases, ActiveCases, PercentRecovered, PercentDeaths } = appendData(TotalConfirmed, TotalDeaths, TotalRecovered);  
  const { NewConfirmed, NewRecovered, NewDeaths } = data;

  let mapedData = {};

  if (Country)
    mapedData = Object.assign(mapedData, { Country, CountryCode, Slug });

  mapedData = Object.assign(mapedData, { TotalConfirmed, TotalRecovered, TotalDeaths, ClosedCases, ActiveCases, PercentRecovered, PercentDeaths });
  mapedData = Object.assign(mapedData, { NewConfirmed, NewRecovered, NewDeaths });

  if (Date)
    mapedData = Object.assign(mapedData, { Date });

  return mapedData;
}

getSummary = async (req, res, next) => {
  const { Global, Countries } = await covid19Api.getSummary();

  const newGlobal = remapData(Global);  
  const newCountries = Countries.map((country) => {
    const newCountry = remapData(country);
    return newCountry;
  });

  res.json({
    Global: newGlobal,
    Countries: newCountries
  });
};

getGlobal = async (req, res, next) => {
  const { Global } = await covid19Api.getSummary();
  const newGlobal = remapData(Global);

  res.json(newGlobal);  
};

getCountries = async (req, res, next) => {
  const { Countries } = await covid19Api.getSummary();
  const newCountries = Countries.map((country) => {
    const newCountry = remapData(country);
    return newCountry;
  });

  res.json(newCountries);
}

getSpecifyCountry = async (req, res, next) => {
  const { Countries } = await covid19Api.getSummary();
  const slug = req.params.slug;
  const filteredCountries = Countries.filter((country) => {
    return country.Slug == slug;
  });
  const newsCountry = remapData(filteredCountries[0]);

  res.json(newsCountry);
}

module.exports.getSummary = getSummary;
module.exports.getGlobal = getGlobal;
module.exports.getCountries = getCountries;
module.exports.getSpecifyCountry = getSpecifyCountry;