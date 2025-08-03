const fs = require('fs');
const path = require('path');

console.log('Setting up Centivo User API...\n');

// Check if .env file exists
const envPath = path.join(__dirname, '..', '.env');
if (!fs.existsSync(envPath)) {
  console.log('Creating .env file...');
  const envContent = `# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017

# Server Port (optional, defaults to 3000)
PORT=3000

# Environment (development/production)
NODE_ENV=development
`;
  fs.writeFileSync(envPath, envContent);
  console.log('.env file created');
} else {
  console.log('.env file already exists');
}

console.log('\nNext steps:');
console.log('1. Install dependencies: npm install');
console.log('2. Start MongoDB (if not already running)');
console.log('3. Populate database with sample data: npm run populate');
console.log('4. Start the server: npm run dev');
console.log('5. Test the API: npm test');
console.log('\n��Setup complete!'); 