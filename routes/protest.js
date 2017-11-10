import express from 'express';
import Protest from '../models/Protest.js';

import protestController from '../controllers/protestController';
import commentController from '../controllers/commentController';

const router = express.Router();

router.route('/')
	.get((req, res) => {
		switch(req.query.sort) {
			case 'nearby':
				protestController.sort_nearby(req, res);
				break;
			case 'state':
				protestController.sort_state(req, res);
				break;
			case 'upcoming':
				protestController.sort_upcoming(req, res);
				break;
			case 'date':
				protestController.sort_date(req, res);
				break;
			default:
				res.status(400).json({ error: 'Invalid sort query or query does not exist.'});
		}
	})
	.post(protestController.create);

router.route('/:id')
	.get(protestController.find_by_id)
	.post(protestController.update)
	.delete(protestController.delete);

router.route('/:id/comment')
	.post(commentController.post_comment);

router.route('/:id/comment/:commentid')
	.post(commentController.update_comment)
	.delete(commentController.delete_comment);
	
export default router;