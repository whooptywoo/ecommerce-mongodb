const User = require("../models/User");
const Product = require("../models/Product");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

class Controller {
	static async registerUser(req, res) {
		const { fullName, email, password, phoneNumber } = req.body;
		try {
			const hashedPassword = hashPassword(password);
			const newUser = await User.create({
				fullName,
				email,
				password: hashedPassword,
				phoneNumber,
				role: "customer",
			});
			res.status(201).json({ id: newUser.id, email: newUser.email });
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: "Internal server error." });
		}
	}

	static async login(req, res) {
		const { email, password } = req.body;
		try {
			if (!email)
				throw {
					name: "InvalidLogin",
					code: 400,
					message: "Email is required.",
				};
			if (!password)
				throw {
					name: "InvalidLogin",
					code: 400,
					message: "Password is required.",
				};
			const user = await User.findOne({ email });
			if (!user)
				throw { name: "NotFound", code: 404, message: "User not found." };
			const isValidPassword = comparePassword(password, user.password);
			if (!isValidPassword)
				throw { name: "InvalidLogin", code: 400, message: "Invalid password." };
			const access_token = signToken({ id: user._id });
			res.status(200).json(
				// user
				{ access_token }
			);
		} catch (error) {
			if (error.name == "NotFound" || error.name == "InvalidLogin") {
				res.status(error.code).json({ message: error.message });
			} else {
				console.log(error);
				res.status(500).json({ message: "Internal server error." });
			}
		}
	}

	static async fetchProducts(req, res) {
		try {
			const products = await Product.find().populate("buyers");
            console.log(products)
			res.status(200).json(products);
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: "Internal server error." });
		}
	}
}

module.exports = Controller;
