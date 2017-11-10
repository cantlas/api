import faker from 'faker';

export default function () {
	title = faker.lorem.words();
	category = null;
	organiser = null;
	details = faker.lorem.paragraph();
	date = faker.date.future();
	address = faker.address();
	state = faker.address.state();
	coords = [faker.address.longitude(), faker.address.latitude()];
};


const ProtestSchema = new Schema({
	title: { type: String, required: true },
	category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
	organiser: { type: Schema.Types.ObjectId, ref: 'User' },
	details: { type: String },
	date: { type: Date, default: Date.now },
	address: { type: String },
	state: { type: String, enum: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'] },
	coords: [Number],
	comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
	attendees: {
		going: [{ type: Schema.Types.ObjectId, ref: 'User' }],
		interested: [{ type: Schema.Types.ObjectId, ref: 'User' }]
	}
},
{ timestamps: true }
);