const axios = require('axios');

const instance = axios.create({
  baseURL: 'https://api.covid19api.com/',
  headers: { }
});

apiSummary = () => {
  return new Promise((resolve, reject) => {
    instance.get('/summary')
    .then((res) => {
      resolve(res.data);
    })
    .catch((err) => reject(err));    
  });
};

apiSummaryWithGlobalDate = () => {
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

apiCountries = () => {
  return new Promise((resolve, reject) => {
    instance.get('/countries')
    .then((res) => {
      resolve(res.data);
    })
    .catch((err) => reject(err));
  })
}

apiDayOneAllStatus = (slug) => {
  return new Promise((resolve, reject) => {
    instance.get(`/dayone/country/${slug}`)
    .then((res) => {
      resolve(res.data);
    })
    .catch((err) => reject(err));    
  });
}

module.exports.apiSummary = apiSummary;
module.exports.apiSummaryWithGlobalDate = apiSummaryWithGlobalDate;
module.exports.apiDayOneAllStatus = apiDayOneAllStatus;