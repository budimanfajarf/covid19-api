const axios = require('axios');

const instance = axios.create({
  baseURL: 'https://api.covid19api.com/',
  headers: { }
});

getSummary = () => {
  return new Promise((resolve, reject) => {
    instance.get('/summary')
    .then((res) => {
      resolve(res.data);
    })
    .catch((err) => reject(err));    
  });
};

getSummaryWithGlobalDate = () => {
  return new Promise((resolve, reject) => {
    instance.get('/summary')
    .then((res) => {
      const globalDate = new Date(Math.max.apply(null, res.data.Countries.map(function(country) {
        return new Date(country.Date);
      })));
      res.data.Global.Date = globalDate;
      resolve(res.data);
    })
    .catch((err) => reject(err));    
  });
};

module.exports.getApiSummary = getSummary;
module.exports.getApiSummaryWithGlobalDate = getSummaryWithGlobalDate;