const Sequelize = require("sequelize");
const sequelize = require("../utils/data-base");

const Order = sequelize.define("Order", {
    id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	}
})


module.exports= Order