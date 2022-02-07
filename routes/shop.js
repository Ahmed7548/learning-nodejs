const express = require("express")

const path = require("path")
const routPath= require("../utils/path")

const Router = express.Router();
const { products } = require("../routes/admin")


Router.get("/",(req,res,next) => {
   console.log(products)
   // res.sendFile(path.join(routPath, "views", "shop.pug"))
   res.render("shop", {products, docTitle:" My shop",path:"shop"})
})

module.exports = Router;