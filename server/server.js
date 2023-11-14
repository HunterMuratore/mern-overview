const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3333;
const is_prod = process.env.NODE_ENV === 'production';
const path = require('path');

require('dotenv').config()

const user_routes = require('./routes/user_routes');

const db = require('./config/connection');

// Load JSON Middleware
app.use(express.json());

// Share dist folder files when in production only
if (is_prod) {
    app.use(express.static(path.join(__dirname, '../client/dist')));
}

// Load cookie Middleware
app.use(cookieParser());

// For every other route send back the index.html
if (is_prod) {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'))
    });
}

// Load routes
app.use('/auth', user_routes);

db.once('open', () => {
    console.log('Database Connected!');
    app.listen(PORT, () => console.log('Server listening on port', PORT));
})
