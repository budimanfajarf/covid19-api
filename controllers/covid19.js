const covid19Api = require('../apis/covid19api.com');

appendData = (confirmed, deaths, recovered) => {
  const closedCases = deaths+recovered;
  const activeCases = confirmed-closedCases;
  const percentRecovered = Math.round((recovered/closedCases)*100);
  const percentDeaths = Math.round((deaths/closedCases)*100);  
  return { closedCases, activeCases, percentRecovered, percentDeaths };  
}

remapGlobal = (data) => {
  const { TotalConfirmed, TotalDeaths, TotalRecovered, NewConfirmed, NewDeaths, NewRecovered } = data;
  const appendTotal = appendData(TotalConfirmed, TotalDeaths, TotalRecovered);  
  const appendNew = appendData(NewConfirmed, NewDeaths, NewRecovered);
  return { 
    TotalConfirmed, 
    TotalRecovered, 
    TotalDeaths, 
    TotalClosedCases: appendTotal.closedCases, 
    TotalActiveCases: appendTotal.activeCases, 
    PercentTotalRecovered: appendTotal.percentRecovered, 
    PercentTotalDeaths: appendTotal.percentDeaths,
    NewConfirmed, 
    NewDeaths,
    NewRecovered,
    NewClosedCases: appendNew.closedCases, 
    NewActiveCases: appendNew.activeCases, 
    PercentNewRecovered: appendNew.percentRecovered, 
    PercentNewDeaths: appendNew.percentDeaths,    
  };
}

remapCountry = (data) => {
  const { Country, CountryCode, Slug, Date, TotalConfirmed, TotalDeaths, TotalRecovered, NewConfirmed, NewDeaths, NewRecovered } = data;
  const appendTotal = appendData(TotalConfirmed, TotalDeaths, TotalRecovered);  
  const appendNew = appendData(NewConfirmed, NewDeaths, NewRecovered);
  return { 
    Country,
    CountryCode,
    Slug,
    TotalConfirmed, 
    TotalRecovered, 
    TotalDeaths, 
    TotalClosedCases: appendTotal.closedCases, 
    TotalActiveCases: appendTotal.activeCases, 
    PercentTotalRecovered: appendTotal.percentRecovered, 
    PercentTotalDeaths: appendTotal.percentDeaths,
    NewConfirmed, 
    NewDeaths,
    NewRecovered,
    NewClosedCases: appendNew.closedCases, 
    NewActiveCases: appendNew.activeCases, 
    PercentNewRecovered: appendNew.percentRecovered, 
    PercentNewDeaths: appendNew.percentDeaths,    
    Date
  };
}

getSummary = async (req, res, next) => {
  const { Global, Countries } = await covid19Api.getSummary();

  console.log('req.query', req.query);

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