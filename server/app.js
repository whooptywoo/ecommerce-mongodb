const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const routes = require("./routes");
const cors = require("cors");
const mongoose = require("mongoose");
const runSeed = require('./seeders')

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
mongoose.connect("mongodb://localhost/testdb");
// runSeed()

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
