import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
	name: { type: String, required: true, min: 3, max: 100 }
},
{ timestamps: true }
);

CategorySchema
	.virtual('url')
	.get(() => '/v1/protest/' + this._id);

module.exports = mongoose.model('Category', CategorySchema);