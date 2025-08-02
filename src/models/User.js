const { ObjectId } = require('mongodb');
const database = require('../config/database');

class User {
  constructor() {
    this.collectionName = 'users';
  }

  getCollection() {
    return database.getDb().collection(this.collectionName);
  }

  async findById(id) {
    try {
      // Validate ObjectId format
      if (!ObjectId.isValid(id)) {
        throw new Error('Invalid user ID format');
      }

      const collection = this.getCollection();
      
      // Query for user with matching _id and age > 21
      const user = await collection.findOne({
        _id: new ObjectId(id),
        age: { $gt: 21 }
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async create(userData) {
    try {
      const collection = this.getCollection();
      const result = await collection.insertOne(userData);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async createMany(usersData) {
    try {
      const collection = this.getCollection();
      const result = await collection.insertMany(usersData);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteAll() {
    try {
      const collection = this.getCollection();
      const result = await collection.deleteMany({});
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const collection = this.getCollection();
      const users = await collection.find({}).toArray();
      return users;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new User(); 