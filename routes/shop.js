const express = require("express");
const Router = express.Router();
const {displayCart,displayProducts,indexPage,getUserProductDetail,addOrderHandler,showOrders}=require("../controllers/shop-product-handlers")
const {postProductToCart,updateProductsInData,deleteProduct}=require("../controllers/cartLogic")


Router.get("/",indexPage)
Router.get("/products", displayProducts);
Router.get("/cart", displayCart)
Router.get("/product-detail/:id",getUserProductDetail)
Router.post("/products/addToCart", postProductToCart)
Router.post("/products/updateCart", updateProductsInData)
Router.post("/products/updateCart/delete", deleteProduct)
Router.post("/add-order", addOrderHandler)
Router.get("/orders",showOrders)
// Router.get("/orders/:userId",addOrderHandler)

module.exports = Router;    
