var passport = require('passport'),
  	mongoose = require('mongoose'),
	  User = mongoose.model('User'),
	  jwt = require('express-jwt');

var path = process.cwd();

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

    app.get('/api/users', auth, function(req, res, next){
      var currentUserId = req.payload._id;
      User.find({"_id": { $ne: currentUserId }},{"hash": 0, "salt": 0}, function(err, users){
        if(err){ return next(err); }

        res.json(users);
      })
    })

    app.get('/api/user/friends', auth, function(req, res, next){
      var currentUserId = req.payload._id;
      User.findOne({"_id": currentUserId },{"hash": 0, "salt": 0, "requestsSend": 0, "_id":0, "username": 0, "__v": 0, "pendingRequests": 0})
        .populate("friends", "_id username")
        .exec(function(err, user){
          if(err){ return next(err); }

          res.json(user.friends);
      })
    })

    app.get('/api/user/friend-requests', auth, function(req, res, next){
      var currentUserId = req.payload._id;
      User.findOne({"_id": currentUserId },{"hash": 0, "salt": 0, "requestsSend": 0, "_id":0, "username": 0, "__v": 0, "friends": 0})
      .populate("pendingRequests", "_id username")
      .exec(function(err, user){
        if(err){ return next(err); }

        res.json(user.pendingRequests);
      })
    })

    app.post('/api/users/send-friend-request', auth, function(req, res, next){
      var currentUserId = req.payload._id;
      console.log(currentUserId);
      var userId = req.body.userId;
    
      // find friend and add currentUser to pendingRequests
      User
       .findOne({"_id": userId, "pendingRequests": { $ne: currentUserId }}, function(err, user){
         if(err) { res.error(err) };
         user.pendingRequests.push(mongoose.Types.ObjectId(currentUserId));
         user.save();
       })

      // find currentUser and add friend to requestsSend
      User
       .findOne({"_id": currentUserId, "requestsSend": { $ne: userId }}, function(err, user){
         if(err) { res.error(err) };
         user.requestsSend.push(mongoose.Types.ObjectId(userId));
         user.save();
       })
    });

    app.post('/api/users/accept-friend-request', auth, function(req, res, next){
      var currentUserId = req.payload._id;
      var userId = req.body.userId;
    
      // find friend and add currentUser to friends and remove it from requestsSend
      User
       .findOne({"_id": userId, "friends": { $ne: currentUserId }, "requestsSend": currentUserId }, function(err, user){
         if(err) { res.error(err) };
         user.friends.push(mongoose.Types.ObjectId(currentUserId));
         user.requestsSend.pull(currentUserId)
         user.save();
       })
      
      // find currentUser and add friend to friends and remove it from pendindRequests
      User
       .findOne({"_id": currentUserId, "friends": { $ne: userId }, "pendingRequests": userId }, function(err, user){
        if(err) { res.error(err) };
          user.friends.push(mongoose.Types.ObjectId(userId));
          user.pendingRequests.pull(userId)
          user.save();
       })
    });

    app.post('/api/users/cancel-friend-request', auth, function(req, res, next){
      var currentUserId = req.payload._id;
      var userId = req.body.userId;
    
      // find friend and remove currentUser from pendingRequests
      User
       .findOne({"_id": userId, "pendingRequests": currentUserId}, function(err, user){
         if(err) { res.error(err) };
         user.pendingRequests.pull(currentUserId)
         user.save();
       })
      
      // find currentUser and remove friend from requestsSend
      User
       .findOne({"_id": currentUserId, "requestsSend": userId}, function(err, user){
        if(err) { res.error(err) };
          user.requestsSend.pull(userId)
          user.save();
       })
    });

    app.post('/api/users/delete-friend', auth, function(req, res, next){
      var currentUserId = req.payload._id;
      var friendId = req.body.friendId;
    
      // find friend and add currentUser to pendingRequests
      User
       .findOne({"_id": friendId, "friends": currentUserId }, function(err, user){
         if(err) { res.error(err) };
         user.friends.pull(currentUserId);
         user.save();
       })

      // find currentUser and add friend to requestsSend
      User
       .findOne({"_id": currentUserId, "friends": friendId }, function(err, user){
         if(err) { res.error(err) };
         user.friends.pull(friendId);
         user.save();
       })
    });



    // ******* FRONTEND ROUTES *******
    // route to handle all angular requests
    app.get('/', function(req, res) {
        res.sendFile(process.cwd() + '/public/views/index.html'); // load our public/index.html file
    });

};