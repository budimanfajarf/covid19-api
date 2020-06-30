const { apiSummaryWithGlobalDate, apiSummary, apiDayOneAllStatus, apiByCountryAllStatus } = require('./default');
const { generateGlobal, generateCountries, generateSpecifyCountry, generateDetailCountry } = require('./function');

getSummary = () => {
  return new Promise((resolve, reject) => {
    apiSummaryWithGlobalDate()
    .then((data) => {
      const newGlobal = generateGlobal(data.Global);
      const newCountries = generateCountries(data.Countries);
      resolve({
        global: newGlobal,
        countries: newCountries
      })
    })
    .catch((err) => reject(err));    
  });  
};

getGlobal = () => {
  return new Promise((resolve, reject) => {
    apiSummaryWithGlobalDate()
    .then((data) => {
      const newGlobal = generateGlobal(data.Global);
      resolve(newGlobal);       
    })
    .catch((err) => reject(err));    
  });
};

getCountries = () => {
  return new Promise((resolve, reject) => {
    apiSummary()
    .then((data) => {
      const newCountries = generateCountries(data.Countries);
      resolve(newCountries);       
    })
    .catch((err) => reject(err));     
  });
}

getDetailCountry = (slug, from, to) => {
  return new Promise((resolve, reject) => {
    let specifyCountry;
    if (from && to) {
      apiByCountryAllStatus(slug, from, to)
      .then((data) => {
        specifyCountry = generateDetailCountry(data, slug);
        resolve(specifyCountry);       
      })
      .catch((err) => reject(err));       
    }
    else {
      apiDayOneAllStatus(slug)
      .then((data) => {
        specifyCountry = generateDetailCountry(data, slug);
        resolve(specifyCountry);       
      })
      .catch((err) => reject(err));            
    } 
  });
}

module.exports.getSummary = getSummary;
module.exports.getGlobal = getGlobal;
module.exports.getCountries = getCountries;
module.exports.getDetailCountry = getDetailCountry;