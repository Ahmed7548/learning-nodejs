const express = require("express");

const path = require("path");
const adminRouter = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();
const {errorController}= require("./controllers/errorPage-contraoller")
const { connectToDataBase } = require("./utils/data-base")
// const User = require("./models/user");
const {User}=require("./models/mongooseUser")
app.set("view engine", "ejs");
app.set("views", "views"); //tells express the directory of templating engine

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ type: "application/json" }));

app.use(express.static(path.join(__dirname, "public")));
//middle ware here must be before our routes so that it apply to them --order matters


let user;
app.use(async (req, res, next) => {
	if (user) {
		req.user = user
		req.cart= user.cart
	} else {
		user = await User.findById("6234a0932169ff4cc3007348")
		req.user = user
		req.cart= user.cart
	}
	next()
})
app.use("/admin", adminRouter);
app.use("/shop", shopRoutes);
app.get("/", errorController)




connectToDataBase(_ => {
	app.listen(8080, () => {
		console.log("app is running on port 8080")
	})
})