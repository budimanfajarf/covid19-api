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

getDayOneAllStatus = (slug) => {
  return new Promise((resolve, reject) => {
    instance.get(`/dayone/country/${slug}`)
    .then((res) => {
      resolve(res.data);
    })
    .catch((err) => reject(err));    
  });
}

getByCountryAllStatus = (slug, from, to) => {
  // https://api.covid19api.com/country/south-africa?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z  
  return new Promise((resolve, reject) => {
    instance.get(`/country/${slug}?from=${from}&to=${to}`)
    .then((res) => {
      resolve(res.data);
    })
    .catch((err) => reject(err));    
  });  
}

module.exports.getApiSummary = getSummary;
module.exports.getApiSummaryWithGlobalDate = getSummaryWithGlobalDate;
module.exports.getApiDayOneAllStatus = getDayOneAllStatus;
module.exports.getApiByCountryAllStatus = getByCountryAllStatus;