var mongoose = require('mongoose');

var FlavorSchema = new mongoose.Schema({
  title: String,
  author: String,
  authorProfilePicture: String,
  upvotes: {type: Number, default: 0},
  upvotesBy: Array,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

FlavorSchema.methods.upvote = function(name, cb){
  this.upvotes += 1;
  this.upvotesBy.push(name);
  this.save(cb);
}

FlavorSchema.methods.downvote = function(index, cb){
  this.upvotes -= 1;
  this.upvotesBy.splice(index, 1);
  this.save(cb);
}


mongoose.model('Flavor', FlavorSchema);