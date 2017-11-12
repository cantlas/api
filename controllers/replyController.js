import Protest from '../models/Protest';
import User from '../models/User';
import Comment from '../models/Comment';
import mongoose from 'mongoose';

export default {

	post_reply: async (req, res) => {
		try {
			req.currentUser = "5a015ce903c3bf06ccd8e44d";
			const reply = {
				id: mongoose.Types.ObjectId(),
				author: req.currentUser,
				body: req.body.reply
			} ;
			const comment = await Comment.findByIdAndUpdate(req.params.commentid, { $push: { replies: reply }}, {new: true});
			res.json({ comment });
		} catch (err) {
			console.log(err);
			res.status(400).json({ errors: err });
		};
	},

	update_reply: async (req, res) => {
		try {
			const comment = await Comment.findById(req.params.commentid);
			console.log(comment);
			console.log(comment.replies);
			let review = comment.replies.id(req.params.replyid);
			review.body = req.body.text;
			await comment.save();
			res.json({ comment });
		} catch (err) {
			console.log(err);
			res.status(400).json({ errors: err });
		};
	},

	delete_reply: async (req, res) => {
		try{
			const comment = await Comment.findById(req.params.commentid);
			comment.replies.id(req.params.replyid).remove();
			await comment.save();
			res.json({ comment })
		} catch (err) {
			console.log(err);
			res.status(400).json({ errors: err });
		};
	},
	
};