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
  return countries.map((country) => {
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
};

generateCountry = (countryLogs, slug) => {
  const newCountryLogs = countryLogs.map((country) => {
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

  const sortedNewCountryLogs = newCountryLogs.sort((a,b) => {
      return new Date(b.Date) - new Date(a.Date);
  });

  return {
    country: countryLogs[0].Country,
    countryCode: countryLogs[0].CountryCode,
    slug,
    totalConfirmed: sortedNewCountryLogs[0].confirmed,
    totalRecovered: sortedNewCountryLogs[0].recovered,
    totalDeaths: sortedNewCountryLogs[0].deaths,        
    totalClosed: sortedNewCountryLogs[0].closed,
    totalActive: sortedNewCountryLogs[0].active,
    totalRecoveredPercent: sortedNewCountryLogs[0].recoveredPercent,
    totalDeathsPercent: sortedNewCountryLogs[0].deathsPercent,                
    date: sortedNewCountryLogs[0].date,
    history: sortedNewCountryLogs
  };  
}

module.exports.generateGlobal = generateGlobal;
module.exports.generateCountries = generateCountries;
module.exports.generateCountry = generateCountry;
