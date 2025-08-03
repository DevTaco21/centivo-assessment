module.exports = {
  // Database
  DATABASE_NAME: 'centivo_assessment',
  COLLECTION_NAME: 'users',
  
  // Age filtering
  MIN_AGE: 21,
  
  // HTTP Status Codes
  STATUS_CODES: {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500
  },
  
  // Error Messages
  ERROR_MESSAGES: {
    INVALID_ID: 'Invalid user ID format',
    USER_NOT_FOUND: 'User not found or user is 21 or younger',
    INTERNAL_ERROR: 'Internal server error',
    DB_CONNECTION_FAILED: 'Failed to connect to MongoDB'
  },
  
  // Success Messages
  SUCCESS_MESSAGES: {
    DB_CONNECTED: 'Connected to MongoDB successfully',
    SERVER_RUNNING: 'Server is running'
  }
}; 