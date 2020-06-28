const axios = require('axios');

const instance = axios.create({
  baseURL: 'https://api.covid19api.com/',
  headers: { }
});

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

getSummary = () => {
  return new Promise((resolve, reject) => {
    instance.get('/summary')
    .then((res) => {
      const { Global, Countries } = res.data;
      const newGlobal = remapGlobal(Global);
      const newCountries = Countries.map((country) => {
        const newCountry = remapCountry(country);
        return newCountry;
      });
      resolve({
        Global: newGlobal,
        Countries: newCountries
      });
    })
    .catch((err) => reject(err));    
  });
}

getGlobal = () => {
  return new Promise((resolve, reject) => {
    instance.get('/summary')
    .then((res) => {
      const { Global } = res.data;
      const newGlobal = remapGlobal(Global);
      resolve(newGlobal);
    })
    .catch((err) => reject(err));    
  });
}

getCountries = () => {
  return new Promise((resolve, reject) => {
    instance.get('/summary')
    .then((res) => {
      const { Countries } = res.data;
      const newCountries = Countries.map((country) => {
        const newCountry = remapCountry(country);
        return newCountry;
      });
      resolve(newCountries);
    })
    .catch((err) => reject(err));    
  });
}

getByCountry = (slug) => {
  return new Promise((resolve, reject) => {
    instance.get('/summary')
    .then((res) => {
      const { Countries } = res.data;
      const newCountries = Countries.map((country) => {
        const newCountry = remapCountry(country);
        return newCountry;
      });
      const filterCountries = newCountries.filter((country) => {
        return country.Slug == slug;
      });
      resolve(filterCountries[0]);
    })
    .catch((err) => reject(err));    
  });
}

module.exports.getSummary = getSummary;
module.exports.getGlobal = getGlobal;
module.exports.getCountries = getCountries;
module.exports.getByCountry = getByCountry;