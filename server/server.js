const express = require('express');

const app = express();
const PORT = process.env.PORT || 3333;

const user_routes = require('./routes/user_routes');

const db = require('./config/connection');

app.use(express.json());

app.use('/auth', user_routes);

db.once('open', () => {
    console.log('Database Connected!');
    app.listen(PORT, () => console.log('Server listening on port', PORT));
})
