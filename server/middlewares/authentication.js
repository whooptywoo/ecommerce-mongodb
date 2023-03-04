const { verifyToken } = require("../helpers/jwt");
const User = require("../models/User");

const authentication = async (req, res, next) => {
	const { access_token } = req.headers;
    console.log(access_token)
	try {
		if (!access_token) throw { name: "InvalidToken" };
		const payload = verifyToken(access_token);
		const user = await User.findById(payload.id);
        console.log(user)
		if (!user) throw { name: "InvalidToken" };
		const { id, email, role, fullName } = user;
		req.user = {
			id,
			email,
			role,
			fullName,
		};
		next();
	} catch (error) {
		if (error.name == "InvalidToken" || error.name == "JsonWebTokenError") {
			res.status(401).json("Invalid token.");
		} else {
			console.log(error);
			res.status(500).json("Internal server error.");
		}
	}
};

module.exports = authentication;
