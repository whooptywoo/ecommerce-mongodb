const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	name: String,
	price: Number,
	imgUrl: String,
	buyers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Products", productSchema);
