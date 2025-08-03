const database = require('../config/database');

class BaseModel {
  constructor(collectionName) {
    this.collectionName = collectionName;
  }

  getCollection() {
    return database.getDb().collection(this.collectionName);
  }

  // Create operations
  async create(data) {
    try {
      const collection = this.getCollection();
      const result = await collection.insertOne(data);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async createMany(dataArray) {
    try {
      const collection = this.getCollection();
      const result = await collection.insertMany(dataArray);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Read operations
  async findById(id, options = {}) {
    try {
      const collection = this.getCollection();
      const query = { _id: id };
      
      if (options.additionalFilters) {
        Object.assign(query, options.additionalFilters);
      }

      const result = await collection.findOne(query);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findOne(filter, options = {}) {
    try {
      const collection = this.getCollection();
      const result = await collection.findOne(filter, options);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async find(filter = {}, options = {}) {
    try {
      const collection = this.getCollection();
      const result = await collection.find(filter, options).toArray();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findWithPagination(filter = {}, options = {}) {
    try {
      const collection = this.getCollection();
      const { page = 1, limit = 10, sort = {} } = options;
      const skip = (page - 1) * limit;

      const [data, total] = await Promise.all([
        collection.find(filter)
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .toArray(),
        collection.countDocuments(filter)
      ]);

      return {
        data,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw error;
    }
  }

  // Update operations
  async updateById(id, updateData, options = {}) {
    try {
      const collection = this.getCollection();
      const result = await collection.updateOne(
        { _id: id },
        { $set: updateData },
        options
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateOne(filter, updateData, options = {}) {
    try {
      const collection = this.getCollection();
      const result = await collection.updateOne(
        filter,
        { $set: updateData },
        options
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateMany(filter, updateData, options = {}) {
    try {
      const collection = this.getCollection();
      const result = await collection.updateMany(
        filter,
        { $set: updateData },
        options
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Delete operations
  async deleteById(id) {
    try {
      const collection = this.getCollection();
      const result = await collection.deleteOne({ _id: id });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteOne(filter) {
    try {
      const collection = this.getCollection();
      const result = await collection.deleteOne(filter);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteMany(filter) {
    try {
      const collection = this.getCollection();
      const result = await collection.deleteMany(filter);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Utility operations
  async count(filter = {}) {
    try {
      const collection = this.getCollection();
      const result = await collection.countDocuments(filter);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async exists(filter) {
    try {
      const collection = this.getCollection();
      const result = await collection.findOne(filter, { projection: { _id: 1 } });
      return !!result;
    } catch (error) {
      throw error;
    }
  }

  async aggregate(pipeline) {
    try {
      const collection = this.getCollection();
      const result = await collection.aggregate(pipeline).toArray();
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = BaseModel; 