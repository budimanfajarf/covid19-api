const axios = require('axios');

const instance = axios.create({
  baseURL: 'https://api.covid19api.com/',
  headers: { }
});

function remapData(data) {
  const { TotalConfirmed, TotalDeaths, TotalRecovered } = data;
  const TotalClosedCases = TotalDeaths+TotalRecovered;
  const TotalActiveCases = TotalConfirmed-TotalClosedCases;
  const PercentRecovered = Math.round((TotalRecovered/TotalClosedCases)*100);
  const PercentDeaths = Math.round((TotalDeaths/TotalClosedCases)*100);

  return {
    TotalConfirmed,
    TotalRecovered,
    TotalDeaths,
    TotalClosedCases,
    TotalActiveCases,
    PercentRecovered,
    PercentDeaths
  };
}

function getDefault() {
  return new Promise((resolve, reject) => {
    instance.get()
    .then((response) => {
      resolve((response.data))
    })
    .catch((error) => reject(error));    
  })
}

function getSummary() {
  return new Promise((resolve, reject) => {
    instance.get('/summary')
    .then((response) => {
      let data = response.data;
      let globalData = remapData(data.Global);

      resolve((globalData));
    })
    .catch((error) => reject(error));    
  });
}

function getCountries() {
  return new Promise((resolve, reject) => {
    resolve({});
  });
}

function getByCountry(slug) {
  return new Promise((resolve, reject) => {
    resolve({});
  });  
}

module.exports.getDefault = getDefault;
module.exports.getSummary = getSummary;
module.exports.getCountries = getCountries;
module.exports.getByCountry = getByCountry;