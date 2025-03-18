const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		recipe: {
			type: String,
			required: true,
		},
	},

	{ timestamps: true }
);

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		pantry: [foodSchema],
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
