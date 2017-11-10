import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: { type: String, required: true, lowercase: true, index: true, unique: true },
	passwordHash: { type: String },
	username: { type: String },
	age: { type: Number },
	about: { type: String, min: 25, max: 250 },
	subscriptions_own: [{ type: Schema.Types.ObjectId, ref: 'Protest' }],
	subscriptions_attending: [{ type: Schema.Types.ObjectId, ref: 'Protest' }]
},
{ timestamps: true }
);

UserSchema
	.virtual('url')
	.get(() => '/v1/protest/' + this._id);

module.exports = mongoose.model('User', UserSchema);