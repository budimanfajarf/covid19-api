
notFound = function(req, res, next) {
  next({
    response: {
      status: 404,
      statusText: 'Not Found'
    }
  });
}

errorHandler = function (err, req, res, next) {
  /*
    err.response object is getting from error axios
    so, the notFound function follow this error object
  */

  res.status(err.response.status || 500);
  res.json({
    message: err.response.statusText || 'Server Error'
  });
}

module.exports.notFound = notFound;
module.exports.errorHandler = errorHandler;
