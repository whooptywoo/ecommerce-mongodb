const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	name: String,
	price: Number,
	image: String,
	buyers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Products", productSchema);
