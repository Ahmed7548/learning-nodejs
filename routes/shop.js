const express = require("express");
const Router = express.Router();
const {displayCart,displayProducts,indexPage,getUserProductDetail,addOrderHandler,showOrders}=require("../controllers/shop-product-handlers")
const {postProductToCart,updateProductsInData,deleteProduct}=require("../controllers/cartLogic");
const User = require("../models/user");


Router.get("/", indexPage)
Router.get("/products", displayProducts);
Router.use("/cart",async (req,res,next) => {
    let user = await User.findById("622511956b8ddc45623eb904")
    user= new User(user)
    req.user = user
    next()
})
Router.get("/cart", displayCart)
Router.get("/product-detail/:id",getUserProductDetail)
Router.post("/products/addToCart", postProductToCart)
Router.post("/products/updateCart", updateProductsInData)
Router.post("/products/updateCart/delete", deleteProduct)
Router.post("/add-order", addOrderHandler)
Router.get("/orders", showOrders)

// Router.get("/orders/:userId",addOrderHandler)

module.exports = Router;    
