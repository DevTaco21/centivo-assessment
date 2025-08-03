const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

async function testAPI() {
  console.log('Testing Centivo User API...\n');

  const tests = [
    {
      name: 'Health endpoint',
      test: async () => {
        const response = await axios.get(`${BASE_URL}/health`);
        return response.status === 200 && response.data.status === 'OK';
      }
    },
    {
      name: 'Invalid ObjectId handling',
      test: async () => {
        try {
          await axios.get(`${BASE_URL}/users/invalid-id`);
          return false; // Should not reach here
        } catch (error) {
          return error.response && error.response.status === 400;
        }
      }
    },
    {
      name: 'Non-existent user handling',
      test: async () => {
        try {
          await axios.get(`${BASE_URL}/users/507f1f77bcf86cd799439011`);
          return false; // Should not reach here
        } catch (error) {
          return error.response && error.response.status === 404;
        }
      }
    },
    {
      name: 'Invalid route handling',
      test: async () => {
        try {
          await axios.get(`${BASE_URL}/invalid-route`);
          return false; // Should not reach here
        } catch (error) {
          return error.response && error.response.status === 404;
        }
      }
    }
  ];

  let passedTests = 0;
  let totalTests = tests.length;

  for (const test of tests) {
    try {
      const result = await test.test();
      if (result) {
        console.log(`PASS: ${test.name}`);
        passedTests++;
      } else {
        console.log(`FAIL: ${test.name}`);
      }
    } catch (error) {
      console.log(`❌ ${test.name} - Error: ${error.message}`);
    }
  }

  console.log(`\nTest Results: ${passedTests}/${totalTests} tests passed`);
  
  if (passedTests === totalTests) {
    console.log('All tests passed!');
  } else {
    console.log('Some tests failed');
  }

      console.log('\nNote: To test with real data, make sure you have:');
  console.log('1. MongoDB running with a "users" collection');
  console.log('2. Sample users with age > 21 in the collection');
  console.log('3. Use valid ObjectIds from your database');
  console.log('4. Run: npm run populate (to add sample data)');
}

// Run tests if this file is executed directly
if (require.main === module) {
  testAPI().catch(error => {
    console.error('Test suite failed:', error.message);
    console.log('\nMake sure the server is running on port 3000');
    process.exit(1);
  });
}

module.exports = { testAPI }; 