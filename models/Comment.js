import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const replySchema = new Schema({
	author: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
	body: { type: String, required: true },
})

const CommentSchema = new Schema({
	author: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
	body: { type: String, required: true },
	replies: [replySchema]
},
{ timestamps: true });

CommentSchema
	.virtual('url')
	.get(() => '/v1/protest/' + this._id);

module.exports = mongoose.model('Comment', CommentSchema);