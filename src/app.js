const express = require('express');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const ResponseHelper = require('./utils/resHelper');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api', routes);

// 404 handler for undefined routes
app.use('*', (req, res) => {
  ResponseHelper.notFound(res, `Cannot ${req.method} ${req.originalUrl}`);
});

// Error handling middleware (must be last)
app.use(errorHandler);

module.exports = app; 