# Boilerplate(express.js) User API

Node.js Express API with MongoDB integration for user data retrieval with age filtering (> 21).

## Setup

```bash
# Install dependencies
npm install

# Configure environment
cp env.example .env
# Edit .env with your MongoDB URI

# Populate database
npm run populate

# Start server
npm run dev
```

## API Endpoints

### GET /api/users/:id
Retrieve user by ID (age > 21 only)

**Response:**
```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "johndoe@email.com",
    "age": 30
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### GET /api/health
Health check endpoint

## Database Schema

```json
{
  "_id": ObjectId,
  "name": "John Doe",
  "email": "johndoe@email.com",
  "age": 30
}
```

## Environment Variables

```
MONGODB_URI=mongodb://localhost:27017
PORT=3000
NODE_ENV=development
```

## Scripts

- `npm start` - Production server
- `npm run dev` - Development server
- `npm test` - Run tests
- `npm run populate` - Seed database
- `npm run setup` - Initialize project 
