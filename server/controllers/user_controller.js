const User = require('../models/User');

const { createToken } = require('./helpers')

module.exports = user_controller = {
    // Register a user
    async register(req, res) {
        try {
            const user = await User.create(req.body);

            const token = await createToken(user._id);

            res.cookie('token', token, {
                maxAge: 60 * 60 * 1000,
                httpOnly: true
            });

            res.send(user);

        } catch (err) {
            console.log(err.message);
            res.send({ error: err.message })
        }
    },
    // Get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();

            res.send(users);

        } catch (err) {
            console.log(err.message);
            res.send({ error: err.message })
        }
    },
    // Login user
    async login(req, res) {
        const {email, password} = req.body;

        try {
            const user = await User.findOne({ email });

            if (!user) return res.status(403).json({ message: 'User not found' });

            const pass_is_valid = await user.validatePass(password);

            if (!pass_is_valid) return res.status(403).json({ message: 'Password invalid' });

            const token = await createToken(user._id);

            res.cookie('token', token, {
                maxAge: 60 * 60 * 1000,
                httpOnly: true
            });
            
            res.send(user);

        } catch (err) {
            console.log(err.message);
            res.send({ error: err.message });
        }
    },
    // Verify user has a valid token
    protected(req, res) {
        res.send({
            user: req.user,
            authenticated: true
        });
    }

};