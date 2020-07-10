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
    totalActive: newData.active,
    totalClosed: newData.closed,
    totalRecovered: global.TotalRecovered,
    totalRecoveredPercent: newData.recoveredPercent,
    totalDeaths: global.TotalDeaths,
    totalDeathsPercent: newData.deathsPercent,
    newConfirmed: global.NewConfirmed,
    newRecovered: global.NewRecovered,
    newDeaths: global.NewDeaths,
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
      totalActive: newData.active,
      totalClosed: newData.closed,
      totalRecovered: country.TotalRecovered,
      totalRecoveredPercent: newData.recoveredPercent,
      totalDeaths: country.TotalDeaths,
      totalDeathsPercent: newData.deathsPercent,
      newConfirmed: country.NewConfirmed,
      newRecovered: country.NewRecovered,
      newDeaths: country.NewDeaths,
      date: country.Date      
    };
  });
};

generateCountryHistories = (countryLogs, slug) => {
  const newCountryLogs = countryLogs.map((country, idx) => {
    const newData = generateNewData(country.Confirmed, country.Recovered, country.Deaths);
    return {
      country: country.Country,
      totalConfirmed: country.Confirmed,
      totalActive: newData.active,
      totalClosed: newData.closed,
      totalRecovered: country.Recovered,
      totalRecoveredPercent: newData.recoveredPercent,
      totalDeaths: country.Deaths,
      totalDeathsPercent: newData.deathsPercent,
      date: country.Date
    };
  });

  const sortedNewCountryLogs = newCountryLogs.sort((a,b) => {
      return new Date(b.date) - new Date(a.date);
  });
  
  sortedNewCountryLogs.shift(); 

  return sortedNewCountryLogs;
}

module.exports.generateGlobal = generateGlobal;
module.exports.generateCountries = generateCountries;
module.exports.generateCountryHistories = generateCountryHistories;
