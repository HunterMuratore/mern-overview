const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3333;

require('dotenv').config()

const user_routes = require('./routes/user_routes');

const db = require('./config/connection');

// Load JSON Middleware
app.use(express.json());
// Load cookie Middleware
app.use(cookieParser());

// Load routes
app.use('/auth', user_routes);

db.once('open', () => {
    console.log('Database Connected!');
    app.listen(PORT, () => console.log('Server listening on port', PORT));
})
