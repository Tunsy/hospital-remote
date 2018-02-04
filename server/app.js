const express = require('express');
const remoteController = require('./controllers/remoteController');


// Use express
const app = express();

// Setup template engine
app.set('view engine', 'ejs');

// Static files
app.use(express.static('./public'));

// Fire controllers
remoteController(app);

// Port
app.listen(3000);
console.log('Listening to port 3000');

