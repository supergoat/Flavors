var passport = require('passport'),
  	mongoose = require('mongoose'),
	  User = mongoose.model('User'),
	  jwt = require('express-jwt');

// Add to any route that requires authentication
var auth = jwt({secret: process.env.SECRET, userProperty: 'payload'});


module.exports = function(app) {

    // ******* SERVER ROUTES *******
    // handle things like api calls
    // authentication routes
    app.post('/register', function(req, res, next){
      if(!req.body.username || !req.body.password){
        return res.status(400).json({message: 'Please fill out all fields'});
      }

      var user = new User();

      user.username = req.body.username;

      user.setPassword(req.body.password)

      user.save(function (err){
        if(err){ return next(err); }

        return res.json({token: user.generateJWT()})
      });
    });

    app.post('/login', function(req, res, next){
      if(!req.body.username || !req.body.password){
        return res.status(400).json({message: 'Please fill out all fields'});
      }

      passport.authenticate('local', function(err, user, info){
        if(err){ return next(err); }

        if(user){
          return res.json({token: user.generateJWT()});
        } else {
          return res.status(401).json(info);
        }
      })(req, res, next);
    });

    // ******* FRONTEND ROUTES *******
    // route to handle all angular requests
    app.get('/', function(req, res) {
        res.sendFile(process.cwd() + '/public/views/index.html'); // load our public/index.html file
    });

};