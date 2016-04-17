//******** MODULES ********
var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	passport = require('passport');

var app = express();
require('dotenv').load();
require('./app/models/Users');
require('./app/models/Flavors');
require('./app/models/Comment');


// ******** CONFIGURATION ********
// config files
var db = require('./config/db');
require('./config/passport');

//set port
var port = process.env.PORT || 8080;

//connect to mongoDB database
mongoose.connect(db.url);

//get all data of the body (POST) paramaters
// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 
app.use(passport.initialize());

// ******** ROUTES ********
require('./app/routes')(app); // configure our routes

// ******** START APP ********
// startup our app at http://localhost:8080
app.listen(port, function() {
	console.log('Listening on port ' + port + '...');
});               

// expose app           
exports = module.exports = app;      