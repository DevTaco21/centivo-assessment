const ResponseHelper = require('../utils/resHelper');

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Handle specific error types
  if (err.name === 'ValidationError') {
    return ResponseHelper.validationError(res, 'Validation Error', err.message);
  }

  if (err.name === 'CastError') {
    return ResponseHelper.badRequest(res, 'The provided ID is not valid', err);
  }

  if (err.name === 'MongoError' && err.code === 11000) {
    return ResponseHelper.conflict(res, 'Duplicate entry found', err);
  }

  // Default error response
  return ResponseHelper.error(res, 'Internal Server Error', 500, err);
};

module.exports = errorHandler; 