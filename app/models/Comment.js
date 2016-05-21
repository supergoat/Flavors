var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
	body: String,
	author: String,
	authorProfilePicture: String,
	upvotes: { type: Number, default: 0},
	upvotesBy: Array,
	date: {type: Date, default: Date.now},
	flavor: { type: mongoose.Schema.Types.ObjectId, ref: 'Flavor'}
});

CommentSchema.methods.upvote = function(name, cb){
	this.upvotes += 1;
	this.upvotesBy.push(name);
	this.save(cb);
}

CommentSchema.methods.downvote = function(index, cb){
  this.upvotes -= 1;
  this.upvotesBy.splice(index, 1);
  this.save(cb);
}

mongoose.model('Comment', CommentSchema);