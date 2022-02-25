const Sequelize = require("sequelize");

const sequelize = require("../utils/data-base");

const CartItem = sequelize.define("Cart", {
	id: {
		type: Sequelize.STRING,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	quantity: {
		type:Sequelize.INTEGER,
	},
});

module.exports = CartItem;
