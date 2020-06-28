const covid19Api = require('../apis/covid19api.com');

newData = (TotalConfirmed, TotalDeaths, TotalRecovered) => {
  const TotalClosedCases = TotalDeaths+TotalRecovered;
  const TotalActiveCases = TotalConfirmed-TotalClosedCases;
  const PercentRecovered = Math.round((TotalRecovered/TotalClosedCases)*100);
  const PercentDeaths = Math.round((TotalDeaths/TotalClosedCases)*100);  
  return { TotalClosedCases, TotalActiveCases, PercentRecovered, PercentDeaths };  
}

remapGlobal = (data) => {
  const { TotalConfirmed, TotalDeaths, TotalRecovered } = data;
  const { TotalClosedCases, TotalActiveCases, PercentRecovered, PercentDeaths } = newData(TotalConfirmed, TotalDeaths, TotalRecovered);
  return { TotalConfirmed, TotalRecovered, TotalDeaths, TotalClosedCases, TotalActiveCases, PercentRecovered, PercentDeaths};
}

remapCountry = (data) => {
  const { TotalConfirmed, TotalDeaths, TotalRecovered, Country, CountryCode, Slug, Date } = data;
  const { TotalClosedCases, TotalActiveCases, PercentRecovered, PercentDeaths } = newData(TotalConfirmed, TotalDeaths, TotalRecovered);
  return { Country, CountryCode, Slug, TotalConfirmed, TotalRecovered, TotalDeaths, TotalClosedCases, TotalActiveCases, PercentRecovered, PercentDeaths, Date};
}

getSummary = async (req, res, next) => {
  const { Global, Countries } = await covid19Api.getSummary();
  const newGlobal = remapGlobal(Global);  
  const newCountries = Countries.map((country) => {
    const newCountry = remapCountry(country);
    return newCountry;
  });

  res.json({
    Global: newGlobal,
    Countries: newCountries
  });
};

getGlobal = async (req, res, next) => {
  const { Global } = await covid19Api.getSummary();
  const newGlobal = remapGlobal(Global);

  res.json(newGlobal);  
};

getCountries = async (req, res, next) => {
  const { Countries } = await covid19Api.getSummary();
  const newCountries = Countries.map((country) => {
    const newCountry = remapCountry(country);
    return newCountry;
  });

  res.json(newCountries);
}

getSpecifyCountry = async (req, res, next) => {
  const { Countries } = await covid19Api.getSummary();
  const slug = req.params.slug;
  const newCountries = Countries.map((country) => {
    const newCountry = remapCountry(country);
    return newCountry;
  });
  const filterCountries = newCountries.filter((country) => {
    return country.Slug == slug;
  });

  res.json(filterCountries[0]);
}

module.exports.getSummary = getSummary;
module.exports.getGlobal = getGlobal;
module.exports.getCountries = getCountries;
module.exports.getSpecifyCountry = getSpecifyCountry;