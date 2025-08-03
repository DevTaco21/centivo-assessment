const { STATUS_CODES } = require('./constants');

class ResponseHelper {
  // Success responses
  static success(res, data = null, message = 'Success', statusCode = STATUS_CODES.OK) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString()
    });
  }

  static created(res, data = null, message = 'Resource created successfully') {
    return this.success(res, data, message, STATUS_CODES.CREATED || 201);
  }

  static noContent(res) {
    return res.status(STATUS_CODES.NO_CONTENT || 204).send();
  }

  // Error responses
  static error(res, message = 'Internal server error', statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR, error = null) {
    const response = {
      success: false,
      message,
      timestamp: new Date().toISOString()
    };

    // Only include error details in development
    if (process.env.NODE_ENV === 'development' && error) {
      response.error = {
        name: error.name,
        message: error.message,
        stack: error.stack
      };
    }

    return res.status(statusCode).json(response);
  }

  static badRequest(res, message = 'Bad request', error = null) {
    return this.error(res, message, STATUS_CODES.BAD_REQUEST, error);
  }

  static unauthorized(res, message = 'Unauthorized', error = null) {
    return this.error(res, message, STATUS_CODES.UNAUTHORIZED || 401, error);
  }

  static forbidden(res, message = 'Forbidden', error = null) {
    return this.error(res, message, STATUS_CODES.FORBIDDEN || 403, error);
  }

  static notFound(res, message = 'Resource not found', error = null) {
    return this.error(res, message, STATUS_CODES.NOT_FOUND, error);
  }

  static conflict(res, message = 'Resource conflict', error = null) {
    return this.error(res, message, STATUS_CODES.CONFLICT || 409, error);
  }

  static validationError(res, message = 'Validation failed', errors = null) {
    const response = {
      success: false,
      message,
      timestamp: new Date().toISOString()
    };

    if (errors) {
      response.errors = errors;
    }

    return res.status(STATUS_CODES.BAD_REQUEST).json(response);
  }

  // Pagination response
  static paginated(res, data, pagination, message = 'Data retrieved successfully') {
    return res.status(STATUS_CODES.OK).json({
      success: true,
      message,
      data,
      pagination,
      timestamp: new Date().toISOString()
    });
  }

  // Health check response
  static health(res, status = 'OK', details = {}) {
    return res.status(STATUS_CODES.OK).json({
      status,
      message: 'Server is running',
      timestamp: new Date().toISOString(),
      ...details
    });
  }

  // Custom response with metadata
  static withMetadata(res, data, metadata = {}, message = 'Success', statusCode = STATUS_CODES.OK) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      metadata,
      timestamp: new Date().toISOString()
    });
  }

  // Async wrapper for error handling
  static asyncHandler(fn) {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }

  // Validation error formatter
  static formatValidationErrors(errors) {
    if (Array.isArray(errors)) {
      return errors.map(error => ({
        field: error.path || error.param,
        message: error.message,
        value: error.value
      }));
    }
    return errors;
  }
}

module.exports = ResponseHelper; 