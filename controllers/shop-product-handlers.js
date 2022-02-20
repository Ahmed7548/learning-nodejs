const Product = require("../models/product-data");
const path = require("path");
const rootPath = require("../utils/path");
const CartProduct = require("../models/cart-data");
const productPath = path.join(rootPath, "data", "products.json");
const cartPath= path.join(rootPath,"data","cart.json")


const uid = () => {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
		 + Math.random().toString(16).slice(2)
		 + Date.now().toString(16).slice(4);
}

const getProductDetail = (view,styles,docTitle)=> {
	return (req, res, next) => {
		Product.getsingleProduct(req.params.id, (product) => {
			res.render(view,{styles:styles,product:product,docTitle:docTitle})
		})
	}
}

exports.getUserProductDetail= getProductDetail("shop/product-detail", ["/css/product-detail.css"],"product detail")

  



exports.displayProducts =  (req, res, next) => {
	Product.fetchAll(productPath,(products) => {
		res.render("shop/shop", {
			products,
			docTitle: " My shop",
			path: "products",
		});
	});
};

exports.indexPage= (req, res, next) => {
	Product.fetchAll(productPath,(products) => {
		res.render("shop/index", {
			products,
			docTitle: " My shop",
			path: "products",
		});
	});
};

exports.displayCart = (req, res, next) => {
	CartProduct.fetchAll(cartPath, (cart) => {	
		console.log(cart)
		console.log(cart.cartProducts,"hererer")
		res.render("shop/cart", {
			products: cart.cartProducts,
			totalPrice:cart.totalPrice,
			path: "cart",
			docTitle: "Cart",
			styles:[ "/css/cart.css"],
		});
	})
};

exports.OrderHandler = (req, res, next) => {
	res.render("/shop/order")
}