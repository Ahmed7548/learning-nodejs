//admin/.....
const {
	getAddProduct,
	postAddedProduct,
	displayAdminProducts,
	postEdittedProduct,
	getAdminProdctDetail,
	postDeleteProduct,
} = require("../controllers/admin-product-handler");

const express = require("express");

const Router = express.Router();

Router.get("/add-product", getAddProduct);
Router.post("/add-product", postAddedProduct);
Router.get("/admin-products", displayAdminProducts);
Router.get("/edit-product/:id", getAdminProdctDetail);
Router.post("/edit-product/:id", postEdittedProduct);
Router.post("/delete-product", postDeleteProduct);

module.exports = Router;
