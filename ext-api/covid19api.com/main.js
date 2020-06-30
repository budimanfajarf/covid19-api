const { apiSummary, apiSummaryWithGlobalDate, apiDayOneAllStatus, apiByCountryAllStatus } = require('./default');
const { remapGlobal, remapCountries, remapCountry } = require('./function');

getSummary = () => {
  return new Promise((resolve, reject) => {
    apiSummaryWithGlobalDate()
    .then((data) => {
      const global = remapGlobal(data.Global);
      const countries = remapCountries(data.Countries);
      resolve({
        global,
        countries
      })
    })
    .catch((err) => reject(err));    
  });  
};

getGlobal = () => {
  return new Promise((resolve, reject) => {
    apiSummaryWithGlobalDate()
    .then((data) => {
      const global = remapGlobal(data.Global);
      resolve(global);       
    })
    .catch((err) => reject(err));    
  });
};

getCountries = () => {
  return new Promise((resolve, reject) => {
    apiSummary()
    .then((data) => {
      const countries = remapCountries(data.Countries);
      resolve(countries);       
    })
    .catch((err) => reject(err));     
  });
}

getCountry = (slug, from, to) => {
  return new Promise((resolve, reject) => {
    let country;
    if (from && to) {
      apiByCountryAllStatus(slug, from, to)
      .then((data) => {
        country = remapCountry(data, slug);
        resolve(country);       
      })
      .catch((err) => reject(err));       
    }
    else {
      apiDayOneAllStatus(slug)
      .then((data) => {
        country = remapCountry(data, slug);
        resolve(country);       
      })
      .catch((err) => reject(err));            
    } 
  });
}

module.exports.getSummary = getSummary;
module.exports.getGlobal = getGlobal;
module.exports.getCountries = getCountries;
module.exports.getCountry = getCountry;