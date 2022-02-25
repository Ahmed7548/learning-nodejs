// const http = require("http");

const express = require("express");

const path = require("path");
const sequelize = require("./utils/data-base")
const Product = require("./models/product-data")
const User= require("./models/user")
const adminRouter = require("./routes/admin");
const shopRoutes = require("./routes/shop");




const app = express();

app.set("view engine", "ejs");
app.set("views", "views"); //tells express the directory of templating engine

app.use(express.urlencoded({ extended: true }));
app.use(express.json({type:"application/json"}))

app.use(express.static(path.join(__dirname, "public")));
//middle ware here must be before our routes so that it apply to them --order matters
app.use((req, res, next) => {
	User.findByPk(1).then(user => {
		console.log(user,"user exist")
		req.user=user
		next()
	}).catch(err => { console.log(err) })
})
app.use("/admin", adminRouter);
app.use("/shop", shopRoutes);


Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" })
User.hasMany(Product)

sequelize.sync().then(result => {
	return User.findByPk(1)
	}).then(user => {
		if (user) {
			return user
		} else {
			return User.create({
				userName: "Ahmed",
				email: "test@test.com"
			})
		}
	}).then((user) => {
		console.log(user,"user")
		app.listen(8000, () => {
			console.log("listening on port 8000");
		})
	}).catch(err => {
	console.log(err)
})
