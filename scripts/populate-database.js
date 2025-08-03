const database = require('../src/config/database');
const User = require('../src/models/User');
require('dotenv').config();

const sampleUsers = [
  {
    name: "John Doe",
    email: "johndoe@email.com",
    age: 30
  },
  {
    name: "Jane Smith",
    email: "janesmith@email.com",
    age: 25
  },
  {
    name: "Bob Johnson",
    email: "bobjohnson@email.com",
    age: 35
  },
  {
    name: "Alice Brown",
    email: "alicebrown@email.com",
    age: 19  // This user should not be returned by the API
  },
  {
    name: "Charlie Wilson",
    email: "charliewilson@email.com",
    age: 22
  },
  {
    name: "Diana Davis",
    email: "dianadavis@email.com",
    age: 21  // This user should not be returned by the API
  }
];

async function populateDatabase() {
  try {
    // Connect to database
    await database.connect();
    console.log('Connected to MongoDB');
    
    // Clear existing data
    await User.deleteAll();
    console.log('Cleared existing users collection');
    
    // Insert sample data
    const result = await User.createMany(sampleUsers);
    console.log(`Inserted ${result.insertedCount} users`);
    
    // Display the inserted users with their ObjectIds
    const users = await User.findAll();
    console.log('\nSample users in database:');
    users.forEach(user => {
      console.log(`ID: ${user._id}, Name: ${user.name}, Age: ${user.age}, Email: ${user.email}`);
    });
    
    console.log('\nDatabase populated successfully!');
    console.log('\nYou can now test the API with these ObjectIds:');
    users.forEach(user => {
      console.log(`curl http://localhost:3000/api/users/${user._id}`);
    });
    
  } catch (error) {
    console.error('Error populating database:', error);
  } finally {
    await database.disconnect();
  }
}

// Run if this file is executed directly
if (require.main === module) {
  populateDatabase();
}

module.exports = { populateDatabase }; 