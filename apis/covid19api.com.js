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

module.exports.getSummary = getSummary;