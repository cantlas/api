import Protest from '../models/Protest';
import User from '../models/User';

export default {

	sort_nearby: (req, res) => {
		let lat;
		let lng;

		if (req.query.lng && req.query.lat) {
			lng = parseFloat(req.query.lng);
			lat = parseFloat(req.query.lat);
		} else {
			lng = 138.5993748,
			lat = -34.928626
		};

		const point = {
			type: 'Point',
			coordinates: [lng, lat]
		};

		const geoOptions = {
			spherical: true
		};

		Protest
			.geoNear(point, geoOptions)
			.limit(50)
			.then(results => {
				let protests = [];
				results.forEach((doc) => {
					protests.push({
						distance: doc.dis,
						state: doc.obj.state,
						title: doc.obj.title,
						_id: doc.obj._id,
						category: doc.obj.category,
						organiser: doc.obj.organiser,
						details: doc.obj.details,
						date: doc.obj.date,
						address: doc.obj.address,
						coords: doc.obj.coords,
						comments: doc.obj.comments,
						attendees: doc.obj.attendees
					});
				});
				res.status(200).json(protests);
			})
			.catch(err => res.status(404).json({ error: err }));
		},

	sort_state: (req, res) => {
		if (!req.params.state) {
			res.status(400).json({ error: 'Invalid state or territory query string'});
			return;
		}
		Protest
			.find({ state: req.params.state })
			.then(protests => {
				res.status(200).json(protests);
			})
			.catch(err => res.status(404).json({ error: err }));
		},

	sort_upcoming: (req, res) => {
		const current_time = Date.now();
		Protest
			.find()
			.gt('date', current_time)
			.limit(25)
			.then(protests => {
				res.status(200).json(protests)
			})
			.catch(err => res.status(404).json({ error: err }));
		},

	sort_date: (req, res) => {
		res.status(200).json({ message: 'Protests sorted by date.'});
		},

	find_by_id: (req, res) => {
		Protest
			.findById(req.params.id)
			.then(protest => res.json({ protest }));
		},

	create: async (req, res) => {
		//add server side validations
		req.currentUser = "5a015ce903c3bf06ccd8e44d";
		try {
			const protest = await Protest.create({
				title: req.body.title,/*
				category: req.body.category,
				organiser: req.currentUser._id,
				details: req.body.details,
				date: req.body.date,
				address: req.body.address,
				state: req.body.state,
				coords: req.body.coords,*/
			});
			const user = await User.update(	{_id: req.currentUser},	{ $push: { subscriptions_own: protest._id } });
			res.json({ protest });
		} catch (err) {
			console.log(err);
			res.status(400).json({ errors: err });
		};
	},

	update: async (req, res) => {
		try {
			const protest = await Protest.findByIdAndUpdate(req.params.id, { $set: req.body.update }, {new: true});
			res.json({ protest });
		} catch (err) {
			console.log(err);
			res.status(400).json({ errors: err });
		};
	},

	delete: async (req, res) => {
		//
		req.currentUser = "5a015ce903c3bf06ccd8e44d";
		try {
			await Protest.findByIdAndRemove(req.params.id);
			await User.findByIdAndUpdate(req.currentUser, { $pull: { subscriptions_own: req.params.id } });
			res.json({ message: "Protest deleted."});
		} catch (err) {
			console.log(err);
			res.status(400).json({ errors: err });
		};
	},

	subscribe: async (req, res) => {
		req.currentUser = "5a015ce903c3bf06ccd8e44d";
		try {
			await User.findByIdAndUpdate(req.curentUser, { $push: { subscriptions_attending: req.params.id }});
			await Protest.findByIdAndUpdate(req.params.id, { $push: { attendees: req.curentUser }});
			res.json({ message: "Subscribed."});
		} catch (err) {
			console.log(err);
			res.status(400).json({ errors: err });
		};
	},

	unsubscribe: async (req, res) => {
		req.currentUser = "5a015ce903c3bf06ccd8e44d";
		try {
			await User.findByIdAndUpdate(req.currentUser, { $pull: { subscriptions_attending: req.params.id }});
			await Protest.findByIdAndUpdate(req.params.id, { $pull: { attendees: req.curretUser }});
			res.json({ message: "Unsubscribed."});
		} catch (err) {
			console.log(err);
			res.status(400).json({ errors: err });
		}; 
	},
};