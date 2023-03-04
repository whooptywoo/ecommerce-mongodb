const bcrypt = require("bcryptjs");

const hashPassword = (password) => {
	const salt = bcrypt.genSaltSync(12);
	return bcrypt.hashSync(password, salt);
};

const comparePassword = (password, hash) => {
	return bcrypt.compareSync(password, hash);
};

module.exports = { hashPassword, comparePassword };
