// const http = require("http");

const express = require("express");

const path = require("path");
const dp=require("./utils/data-base")

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

dp.execute("select * from products").then(result => {
	console.log(result)
}).catch(err => {
	console.log(err)
})


const app = express();
const {errorController}= require("./controllers/errorPage-contraoller");
const res = require("express/lib/response");

app.set("view engine", "ejs");
app.set("views", "views"); //tells express the directory of templating engine

app.use(express.urlencoded({ extended: true }));
app.use(express.json({type:"application/json"}))

app.use(express.static(path.join(__dirname, "public")));
app.use("/admin", adminData.Router);
app.use("/shop", shopRoutes);

app.use(errorController);


app.listen(8000, () => {
	console.log("listening on port 8000");
});
