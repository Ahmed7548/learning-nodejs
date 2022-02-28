const Sequelize = require("sequelize");

const sequelize = require("../utils/data-base");

const CartItem = sequelize.define("CartItem", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	quantity: {
		type: Sequelize.INTEGER,
		defaultValue: 1
	},
});

module.exports = CartItem;
