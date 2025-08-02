const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// GET /users/:id - Get user by ID (only if age > 21)
router.get('/:id', userController.getUserById);

module.exports = router; 