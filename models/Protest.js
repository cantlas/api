import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ProtestSchema = new Schema({
	title: { type: String, required: true },
	category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
	organiser: { type: Schema.Types.ObjectId, ref: 'User' },
	details: { type: String },
	date: { type: Date, default: Date.now },
	address: { type: String },
state: { type: String,/* enum: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT']*/ },
	coords: [Number],
	comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
	attendees: {
		going: [{ type: Schema.Types.ObjectId, ref: 'User' }],
		interested: [{ type: Schema.Types.ObjectId, ref: 'User' }]
	}
},
{ timestamps: true }
);

ProtestSchema
	.virtual('url')
	.get(() => '/v1/protest/' + this._id);

module.exports = mongoose.model('Protest', ProtestSchema);