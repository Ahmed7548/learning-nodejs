
const Sequelize= require("sequelize")

const sequelize = new Sequelize("node-app", "root", "ahmed@01097117458", { dialect: "mysql", host: "localhost" })


module.exports = sequelize 

