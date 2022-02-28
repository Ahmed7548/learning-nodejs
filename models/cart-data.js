const Sequelize = require("sequelize");

const sequelize = require("../utils/data-base");

const Cart = sequelize.define("Cart", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	}
});

module.exports = Cart;
