const express = require('express');
const userRoutes = require('./userRoutes');
const userController = require('../controllers/userController');

const router = express.Router();

// Health check endpoint
router.get('/health', userController.getHealth);

// User routes
router.use('/users', userRoutes);

module.exports = router; 