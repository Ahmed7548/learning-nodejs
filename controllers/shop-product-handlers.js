const Product = require("../models/product-data");
const path = require("path");
const rootPath = require("../utils/path");
const CartProduct = require("../models/cart-data");
const productPath = path.join(rootPath, "data", "products.json");
const cartPath = path.join(rootPath, "data", "cart.json")
const {getProductDetail}= require("./shared-handlers")


const uid = () => {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
		 + Math.random().toString(16).slice(2)
		 + Date.now().toString(16).slice(4);
}

// const getProductDetail = (view,styles,docTitle)=> {
// 	return (req, res, next) => {
// 		Product.getsingleProduct(req.params.id).then(([row,fieldData]) => {
// 			res.render(view, { styles: styles, product: row[0], docTitle: docTitle })
// 			console.log(row,"from row")
// 		})
// 	}
// }

exports.getUserProductDetail= getProductDetail("shop/product-detail", ["/css/product-detail.css"],"product detail")

  



exports.displayProducts =  (req, res, next) => {
	Product.findAll().then(products => {
		res.render("shop/index", {
			products:products,
			docTitle: " My shop",
			path: "products",
		});
	}).catch(err=>console.log(err))
};

exports.indexPage= (req, res, next) => {
	Product.findAll().then(products => {
		res.render("shop/index", {
			products:products,
			docTitle: " My shop",
			path: "products",
		});
	}).catch(err=>console.log(err))
};

exports.displayCart = (req, res, next) => {
	CartProduct.fetchAll( (cart) => {	
		console.log(cart)
		console.log(cart.cartProducts,"hererer")
		res.render("shop/cart", {
			products: cart.cartProducts,
			totalPrice:cart.totalPrice,
			path: "cart",
			docTitle: "Cart",
			styles:[ "/css/cart.css"],
		});
	}).then(([rows, fieldData])=> {
		
	})
};

exports.OrderHandler = (req, res, next) => {
	res.render("/shop/order")
}