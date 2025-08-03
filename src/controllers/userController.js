const User = require('../models/User');
const ResponseHelper = require('../utils/resHelper');

class UserController {
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      
      const user = await User.findById(id);

      if (!user) {
        return ResponseHelper.notFound(res, 'User not found or user is 21 or younger');
      }

      return ResponseHelper.success(res, user, 'User retrieved successfully');
      
    } catch (error) {
      console.error('Error retrieving user:', error);
      
      if (error.message === 'Invalid user ID format') {
        return ResponseHelper.badRequest(res, error.message, error);
      }
      
      return ResponseHelper.error(res, 'Internal server error', 500, error);
    }
  }

  async getHealth(req, res) {
    return ResponseHelper.health(res, 'OK', {
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development'
    });
  }
}

module.exports = new UserController(); 