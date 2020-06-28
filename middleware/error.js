module.exports = function (err, req, res, next) {
  console.log('masuk middleware error', err);
  res.status(500).send('something error');  
}