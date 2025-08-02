# Centivo User API

A well-structured Node.js Express API that connects to MongoDB and retrieves user data with age-based filtering, following industry best practices.

## Approach

This API implements a GET endpoint that queries MongoDB for users by ID, with the unique twist of only returning users over 21 years old. The solution follows a clean architecture pattern with proper separation of concerns, comprehensive error handling, and scalable project structure.

## 🏗️ Project Structure

```
centivo_assessment/
├── src/
│   ├── config/
│   │   └── database.js          # Database connection management
│   ├── controllers/
│   │   └── userController.js    # Request/response handling
│   ├── models/
│   │   └── User.js              # Data access layer
│   ├── routes/
│   │   ├── index.js             # Main route aggregator
│   │   └── userRoutes.js        # User-specific routes
│   ├── middleware/
│   │   └── errorHandler.js      # Centralized error handling
│   ├── utils/
│   │   └── constants.js         # Application constants
│   ├── app.js                   # Express app configuration
│   └── server.js                # Server entry point
├── tests/
│   └── api.test.js              # API integration tests
├── scripts/
│   ├── setup.js                 # Project setup helper
│   └── populate-database.js     # Database seeding
├── package.json
├── README.md
└── .gitignore
```

## ✨ Features

- **Clean Architecture**: Separation of concerns with MVC pattern
- **GET `/api/users/:id`** endpoint with age filtering (> 21)
- **Comprehensive Error Handling**: Centralized error processing
- **Database Abstraction**: Clean data access layer
- **Environment Configuration**: Flexible configuration management
- **Graceful Shutdown**: Proper resource cleanup
- **Request Logging**: Built-in request tracking
- **API Versioning**: `/api` prefix for future scalability
- **Health Check**: System status monitoring

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone and setup:**
```bash
git clone <your-repo-url>
cd centivo_assessment
npm run setup
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment:**
```bash
# Edit .env file with your MongoDB connection
MONGODB_URI=mongodb://localhost:27017
PORT=3000
NODE_ENV=development
```

4. **Populate database:**
```bash
npm run populate
```

5. **Start the server:**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

6. **Run tests:**
```bash
npm test
```

## 📡 API Endpoints

### GET /api/users/:id
Retrieves a user by ID (only if age > 21)

**Parameters:**
- `id` (string): MongoDB ObjectId of the user

**Response:**
- `200 OK`: User data in JSON format
- `400 Bad Request`: Invalid ObjectId format
- `404 Not Found`: User not found or user is 21 or younger
- `500 Internal Server Error`: Server error

**Example:**
```bash
curl http://localhost:3000/api/users/507f1f77bcf86cd799439011
```

**Sample Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "johndoe@email.com",
  "age": 30
}
```

### GET /api/health
Health check endpoint

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🗄️ Database Schema

The API expects a "users" collection with documents in this format:
```json
{
  "_id": ObjectId,
  "name": "John Doe",
  "email": "johndoe@email.com",
  "age": 30
}
```

## 🛡️ Error Handling

- **Invalid ObjectId**: Returns 400 with descriptive error message
- **User not found**: Returns 404 with explanation
- **User under 21**: Returns 404 (treated as "not found")
- **Database errors**: Returns 500 with generic error message
- **Route not found**: Returns 404 for undefined routes
- **Uncaught exceptions**: Graceful shutdown with proper cleanup

## 🧪 Testing

The project includes comprehensive API tests:

```bash
npm test
```

Tests cover:
- Health endpoint functionality
- Invalid ObjectId handling
- Non-existent user handling
- Invalid route handling

## 🔧 Development

### Available Scripts
- `npm run setup` - Initialize project configuration
- `npm run dev` - Start development server with auto-restart
- `npm start` - Start production server
- `npm test` - Run API tests
- `npm run populate` - Seed database with sample data

### Environment Variables
- `MONGODB_URI` - MongoDB connection string
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment mode (development/production)

## 📈 Architecture Benefits

1. **Scalability**: Easy to add new features and endpoints
2. **Maintainability**: Clear separation of concerns
3. **Testability**: Isolated components for easy testing
4. **Error Handling**: Centralized error processing
5. **Configuration**: Environment-based configuration
6. **Logging**: Built-in request tracking
7. **Graceful Shutdown**: Proper resource cleanup

## 🚀 Production Deployment

1. Set `NODE_ENV=production`
2. Configure production MongoDB URI
3. Set appropriate PORT
4. Use process manager (PM2, Docker, etc.)
5. Set up monitoring and logging

This architecture follows Node.js best practices and provides a solid foundation for scaling the application as requirements grow. 