const router = require('express').Router();

const user_controller = require('../controllers/user_controller')

// Register user
router.post('/register', user_controller.register);

// Get all users
router.get('/users', user_controller.getUsers);

module.exports = router; 