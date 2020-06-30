
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
  console.log(err);

  let status = 500;
  let message = 'Server Error'; 

  if (err.response) {
    status = err.response.status;
    message = err.response.statusText;    
  }

  res.status(status).json({
    status,
    message
  });
}

module.exports.notFound = notFound;
module.exports.errorHandler = errorHandler;
