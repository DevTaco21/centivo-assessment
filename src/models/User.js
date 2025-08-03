const { ObjectId } = require('mongodb');
const BaseModel = require('./BaseModel');

class User extends BaseModel {
  constructor() {
    super('users');
  }

  async findById(id) {
    try {
      // Validate ObjectId format
      if (!ObjectId.isValid(id)) {
        throw new Error('Invalid user ID format');
      }

      // Use BaseModel's findById with age filter
      const user = await super.findById(new ObjectId(id), {
        additionalFilters: { age: { $gt: 21 } }
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  // Custom methods specific to User model
  async findAll() {
    return await super.find({});
  }

  async deleteAll() {
    return await super.deleteMany({});
  }
}

module.exports = new User(); 