//admin/.....
const path = require("path");
const routPath = require("../utils/path");

const express = require("express");

const Router = express.Router();

const products = [];

Router.get("/add-product", (req, res, next) => {
	res.render("add-product", { path: "add-product", title:"add prodcuct" });
});
Router.post("/add-product", (req, res, next) => {
	console.log(req.body);
	products.push({ title: req.body.title });
	res.redirect("/shop");
	// res.send(`<h1>hello from products</h1>`)
});

module.exports = { Router, products };
