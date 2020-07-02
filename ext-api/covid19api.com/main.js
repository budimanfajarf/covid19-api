const { apiSummary, apiSummaryWithGlobalDate, apiDayOneAllStatus, apiByCountryAllStatus } = require('./default');
const { generateGlobal, generateCountries, generateCountry, generateCountryHistories } = require('./function');

getSummary = () => {
  return new Promise((resolve, reject) => {
    apiSummaryWithGlobalDate()
    .then((data) => {
      const global = generateGlobal(data.Global);
      const countries = generateCountries(data.Countries);

      const summaryGlobal = global;
        delete summaryGlobal.totalActive;
        delete summaryGlobal.totalRecoveredPercent;
        delete summaryGlobal.totalDeathsPercent;

      const summaryCountries = countries.map((country) => {
        delete country.countryCode;
        delete country.totalActive;
        delete country.totalRecoveredPercent;
        delete country.totalDeathsPercent;
        return country;
      });

      resolve({
        global: summaryGlobal,
        countries: summaryCountries
      })
    })
    .catch((err) => reject(err));    
  });  
}

getGlobal = () => {
  return new Promise((resolve, reject) => {
    apiSummaryWithGlobalDate()
    .then((data) => {
      const global = generateGlobal(data.Global);
      resolve(global);       
    })
    .catch((err) => reject(err));    
  });
}

getCountries = () => {
  return new Promise((resolve, reject) => {
    apiSummary()
    .then((data) => {
      const countries = generateCountries(data.Countries);
      listCountries = countries.map((country) => {
        return {
          country: country.country,
          countryCode: country.countryCode,
          slug: country.slug                    
        }
      });
      resolve(listCountries);       
    })
    .catch((err) => reject(err));   
    // apiCountries()
    // .then((data) => {
    //   resolve(data);
    // })
    // .catch((err) => reject(err));  
  });
}

getCountry = (slug) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { Countries } = await apiSummary();
      const countryDayOneAllStatus = await apiDayOneAllStatus(slug);      

      const countries = generateCountries(Countries);

      const filteredCountries = countries.filter((country) => {
        return country.slug == slug;
      });

      if (filteredCountries.length == 0) {
        return reject({
          response: {
            status: 404,
            statusText: 'Country Not Found'
          }
        });
      }

      const country = filteredCountries[0];
      const countryHistories = generateCountryHistories(countryDayOneAllStatus, slug)

      // countryHistories[0].newConfirmed = country.totalConfirmed - countryHistories[0].totalConfirmed;
      // console.log(country.totalConfirmed, country.totalConfirmed);

      country.history = countryHistories;
      resolve(country);
    } catch(ex) {
      reject(ex);
    }   
  });
}

module.exports.getSummary = getSummary;
module.exports.getGlobal = getGlobal;
module.exports.getCountries = getCountries;
module.exports.getCountry = getCountry;
