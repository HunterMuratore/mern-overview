const router = require('express').Router();

const user_controller = require('../controllers/user_controller');

const { isAuthenticated } = require('../controllers/helpers');

// Register user
router.post('/register', user_controller.register);

// Login user
router.post('/login', user_controller.login);

// Logout user
router.get('/logout', user_controller.logout);

// Get all users
router.get('/users', user_controller.getUsers);

// Protected test route
router.get('/protected', isAuthenticated, user_controller.protected);

module.exports = router; 