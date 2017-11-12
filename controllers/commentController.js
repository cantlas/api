import Protest from '../models/Protest';
import User from '../models/User';
import Comment from '../models/Comment';

export default {

	post_comment: async (req, res) => {
		try {
			req.currentUser = "5a015ce903c3bf06ccd8e44d";
			const comment = await Comment.create({
				author: req.currentUser,
				body: req.body.data.body
			});
			const protest = await Protest.findByIdAndUpdate(req.params.id,	{ $push: { comments: comment._id }}, {new: true}).populate('comments');
			res.json({ protest })
		} catch (err) {
			console.log(err);
			res.status(400).json({ errors: err });
		};
	},

	update_comment: async (req, res) => {
		try {
			const comment = await Comment.findByIdAndUpdate(req.params.commentid, { $set: {body: req.body.update.body}}, {new: true});
			res.json({ comment });
		} catch (err) {
			console.log(err);
			res.status(400).json({ errors: err });
		};
	},

	delete_comment: async (req, res) => {
		try{
			const comment = await Comment.findByIdAndRemove(req.params.commentid);
			const protest = await Protest.findByIdAndUpdate(req.params.id, { $pull: { comments: req.params.commentid }}, {new: true});
			console.log(protest);
			res.json({ protest });
		} catch (err) {
			console.log(err);
			res.status(400).json({ errors: err });
		};
	},
	
};