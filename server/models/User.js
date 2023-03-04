const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	fullName: String,
	email: String,
	password: String,
	transactions: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
		},
	],
});

module.exports = mongoose.model("User", userSchema);
