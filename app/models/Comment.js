var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
	body: String,
	author: String,
	upvotes: { type: Number, default: 0},
	flavor: { type: mongoose.Schema.Types.ObjectId, ref: 'Flavor'}
});

CommentSchema.methods.upvote = function(cb){
	this.upvotes += 1;
	this.save(cb);
}

mongoose.model('Comment', CommentSchema);