const { MongoClient } = require('mongodb');
require('dotenv').config();

class Database {
  constructor() {
    this.client = null;
    this.db = null;
  }

  async connect() {
    try {
      this.client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017');
      await this.client.connect();
      this.db = this.client.db('centivo_assessment');
      console.log('Connected to MongoDB successfully');
      return this.db;
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      throw error;
    }
  }

  async disconnect() {
    if (this.client) {
      await this.client.close();
      console.log('Disconnected from MongoDB');
    }
  }

  getDb() {
    if (!this.db) {
      throw new Error('Database not connected. Call connect() first.');
    }
    return this.db;
  }
}

module.exports = new Database(); 