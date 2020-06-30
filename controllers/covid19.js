const covid19Api = require('../apis/covid19api.com');

getSummary = async (req, res, next) => {
  const { Global, Countries } = await covid19Api.getApiSummaryWithGlobalDate();
  const newGlobal = generateGlobal(Global);
  const newCountries = generateCountries(Countries);

  res.json({
    global: newGlobal,
    countries: newCountries
  });
};

getGlobal = () => {
  return new Promise((resolve, reject) => {
    covid19Api.getApiSummaryWithGlobalDate()
    .then((data) => {
      const newGlobal = generateGlobal(data.Global);
      resolve(newGlobal);       
    })
    .catch((err) => reject(err));    
  });
};

getCountries = async (req, res, next) => {
  const { Countries } = await covid19Api.getApiSummary();
  const newCountries = generateCountries(Countries);

  res.json(newCountries);
}

getSpecifyCountry =  (slug, from, to) => {
  return new Promise((resolve, reject) => {
    let specifyCountry;
  
    if (from && to) {
      covid19Api.getApiByCountryAllStatus(slug, from, to)
      .then((data) => {
        specifyCountry = generateSpecifyCountry(data, slug);
        resolve(specifyCountry);       
      })
      .catch((err) => reject(err));       
    }
    else {
      covid19Api.getApiDayOneAllStatus(slug)
      .then((data) => {
        specifyCountry = generateSpecifyCountry(data, slug);
        resolve(specifyCountry);       
      })
      .catch((err) => reject(err));            
    } 
  });
}

calculatePercentOf = (number, ofNumber) => {
  return Math.round((number/ofNumber)*100);
};

generateNewData = (confirmed, recovered, deaths) => {
  const closed = recovered+deaths;
  const active = confirmed-closed;
  const recoveredPercent = calculatePercentOf(recovered, closed);
  const deathsPercent = calculatePercentOf(deaths, closed);
  
  return { closed, active, recoveredPercent, deathsPercent };
};

generateGlobal = (global) => {
  const newData = generateNewData(global.TotalConfirmed, global.TotalRecovered, global.TotalDeaths);
  return {
    totalConfirmed: global.TotalConfirmed,
    totalRecovered: global.TotalRecovered,
    totalDeaths: global.TotalDeaths,
    totalClosed: newData.closed,
    totalActive: newData.active,
    totalRecoveredPercent: newData.recoveredPercent,
    totalDeathsPercent: newData.deathsPercent,
    date: global.Date
  }  
}

generateCountries = (countries) => {
  countries.map((country) => {
    const newData = generateNewData(country.TotalConfirmed, country.TotalRecovered, country.TotalDeaths);
    return {
      country: country.Country,
      countryCode: country.CountryCode,
      slug: country.Slug,
      totalConfirmed: country.TotalConfirmed,
      totalRecovered: country.TotalRecovered,
      totalDeaths: country.TotalDeaths,
      totalClosed: newData.closed,
      totalActive: newData.active,
      totalRecoveredPercent: newData.recoveredPercent,
      totalDeathsPercent: newData.deathsPercent,
      date: country.Date      
    };
  });
  return countries;
};

generateSpecifyCountry = (countries, slug) => {
  const newCountries = countries.map((country) => {
    const newData = generateNewData(country.Confirmed, country.Recovered, country.Deaths);
    return {
      confirmed: country.Confirmed,
      recovered: country.Recovered,
      deaths: country.Deaths,
      closed: newData.closed,
      active: newData.active,
      recoveredPercent: newData.recoveredPercent,
      deathsPercent: newData.deathsPercent,
      date: country.Date
    };
  });

  return {
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
  };  
}

module.exports.getSummary = getSummary;
module.exports.getGlobal = getGlobal;
module.exports.getCountries = getCountries;
module.exports.getSpecifyCountry = getSpecifyCountry;