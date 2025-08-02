const User = require('../models/User');

class UserController {
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ 
          error: 'User not found or user is 21 or younger' 
        });
      }

      res.json(user);
      
    } catch (error) {
      console.error('Error retrieving user:', error);
      
      if (error.message === 'Invalid user ID format') {
        return res.status(400).json({ 
          error: error.message 
        });
      }
      
      res.status(500).json({ 
        error: 'Internal server error' 
      });
    }
  }

  async getHealth(req, res) {
    res.json({ 
      status: 'OK', 
      message: 'Server is running',
      timestamp: new Date().toISOString()
    });
  }
}

module.exports = new UserController(); 