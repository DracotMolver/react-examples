//requiring NPM modeles
// env variables
require('dotenv').config();

// -==============================
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = mongoose.connection;
const app = express();

db.on('error', console.error);

//requiring local modelesc
const configs = require('./config');
const routes = require('./routes/routes');
const helperFunctions = require('./helpers/helperFunctions');


// Uncomment the following lines to start logging requests to consoles.
app.use(morgan('dev'));
// parse application/x-www-form-urlencoded.
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json.
app.use(bodyParser.json({type: 'application/json'}));

//connedting to mongoDB
mongoose.connect('mongodb://'+configs.dbHost+'/'+configs.dbName);
//populating data if DB is not already populated.
helperFunctions.populateDb();

//Initilizing routes.
routes(app);

// serve video files.
app.use('/videos',express.static('videos'));
// serve client side code.
app.use('/',express.static('client'));

//Finally starting the listener
app.listen(configs.applicationPort, function () {
  console.log('NODE_ENV='+process.env.NODE_ENV);
  console.log('Example app listening on port '+configs.applicationPort+'!');
});
