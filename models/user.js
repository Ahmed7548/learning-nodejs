const Sequelize = require("sequelize");
const sequelize = require("../utils/data-base");

const User = sequelize.define("User", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	userName: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

module.exports = User;
