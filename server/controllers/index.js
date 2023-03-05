const User = require("../models/User");
const Product = require("../models/Product");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

class Controller {
	static async registerUser(req, res) {
		const { fullName, email, password, phoneNumber } = req.body;
		try {
			const hashedPassword = hashPassword(password);
			const userSameEmail = await User.findOne({ email });
			if (userSameEmail)
				throw {
					name: "ValidationError",
					code: 400,
					message: "Email is already registered.",
				};
			const newUser = await User.create({
				fullName,
				email,
				password: hashedPassword,
				phoneNumber,
				role: "customer",
			});
			res.status(201).json({ id: newUser.id, email: newUser.email });
		} catch (error) {
			if (error.name === "ValidationError") {
				res.status(error.code).json({ message: error.message });
				return;
			}
			console.log(error);
			res.status(500).json({ message: "Internal server error." });
		}
	}

	static async fetchCart(req, res) {
		const { role, id, email } = req.user;
		try {
			if (role === "admin")
				throw {
					name: "Unauthorized",
					code: 401,
					message: "You are unauthorized for the action.",
				};
			const user = await User.findById(id, {});

			const cart = user.transactions;
			const products = await Promise.all(cart.map(async (el)=> {
				return await Product.findById(el);
			}))
			let cartObj = {};
			products.forEach((el) => {
				if (!cartObj[el._id]) {
					cartObj[el._id] = {
						name: el.name,
						price: el.price,
						quantity: 0,
						subTotal: 0
					};
				}
				cartObj[el._id].quantity += 1;
				cartObj[el._id].subTotal += el.price
			});
			res.status(200).json(cartObj);
		} catch (error) {
			res.status(500).json({ message: "Internal server error" });
			console.log(error);
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
			const products = await Product.find();
			res.status(200).json(products);
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: "Internal server error." });
		}
	}

	static async fetchUsers(req, res) {
		try {
			const users = await User.find();
			res.status(200).json(users);
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: "Internal server error." });
		}
	}

	static async addProduct(req, res) {
		// const { role } = req.user;
		const { name, price, image } = req.body;
		try {
			// if (role !== "admin")
			// 	throw {
			// 		name: "Unauthorized",
			// 		code: 401,
			// 		message: "You are not authorized.",
			// 	};
			const newProduct = await Product.create({ name, price, image });
			res.status(201).json(newProduct);
		} catch (error) {
			if (error.name === "Unauthorized") {
				res.status(error.code).json({ message: error.message });
			} else {
				console.log(error);
				res.status(500).json({ message: "Internal server error." });
			}
		}
	}

	static async deleteProduct(req, res) {
		const { id } = req.params;
		// const { role } = req.user;
		try {
			// if (role !== "admin")
			// 	throw {
			// 		name: "Unauthorized",
			// 		code: 401,
			// 		message: "You are not authorized.",
			// 	};
			const product = await Product.findOne({ _id: id });
			if (!product)
				throw { name: "NotFound", code: 404, message: "Product not found." };
			await Product.deleteOne({ _id: id });
			res.status(200).json({ message: "Success delete." });
		} catch (error) {
			if (error.name === "Unauthorized" || error.name === "NotFound") {
				res.status(error.code).json({ message: error.message });
			} else {
				console.log(error);
				res.status(500).json({ message: "Internal server error." });
			}
		}
	}

	static async addToCart(req, res) {
		const productId = req.params.id;
		const { role } = req.user;
		const userId = req.user.id;
		try {
			if (role === "admin")
				throw {
					name: "Unauthorized",
					code: 401,
					message: "You are not authorized.",
				};
			const product = await Product.findOne({ _id: productId });
			if (!product)
				throw { name: "NotFound", code: 404, message: "Product not found." };
			await Product.findByIdAndUpdate(productId, { $push: { buyers: userId } });
			await User.findByIdAndUpdate(userId, {
				$push: { transactions: productId },
			});
			res.status(200).json({ message: "Added to cart." });
		} catch (error) {
			if (error.name === "Unauthorized" || error.name === "NotFound") {
				res.status(error.code).json({ message: error.message });
			} else {
				console.log(error);
				res.status(500).json({ message: "Internal server error." });
			}
		}
	}

	static async editProductInfo(req, res) {
		// const { role } = req.user;
		const { id } = req.params;
		const { name, price, image } = req.body;
		try {
			// if (role !== "admin")
			// 	throw {
			// 		name: "Unauthorized",
			// 		code: 401,
			// 		message: "You are not authorized.",
			// 	};
			const product = await Product.findOne({ _id: id });
			if (!product)
				throw { name: "NotFound", code: 404, message: "Product not found." };
			await Product.findByIdAndUpdate(id, { name, price, image });
			res.status(200).json({ message: "Success update." });
		} catch (error) {
			if (error.name === "Unauthorized" || error.name === "NotFound") {
				res.status(error.code).json({ message: error.message });
			} else {
				console.log(error);
				res.status(500).json({ message: "Internal server error." });
			}
		}
	}
}

module.exports = Controller;
