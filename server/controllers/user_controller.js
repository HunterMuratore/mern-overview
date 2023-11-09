const User = require('../models/User');

module.exports = user_controller = {
    // Register a user
    async register(req, res) {
        try {
            const user = await User.create(req.body);
    
            res.send(user);

        } catch (err) {
            console.log(err.message);
            res.send({error: err.message})
        }
    },
    // Get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
    
            res.send(users);

        } catch (err) {
            console.log(err.message);
            res.send({error: err.message})
        }
    }
};