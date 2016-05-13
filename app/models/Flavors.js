var mongoose = require('mongoose');

var FlavorSchema = new mongoose.Schema({
  title: String,
  author: String,
  authorProfilePicture: String,
  upvotes: {type: Number, default: 0},
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

FlavorSchema.methods.upvote = function(cb){
  this.upvotes += 1;
  this.save(cb);
}

mongoose.model('Flavor', FlavorSchema);