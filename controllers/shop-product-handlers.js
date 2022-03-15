const Product = require("../models/product-data");
const OrderItem= require("../models/order-item")
const { getProductDetail } = require("./shared-handlers");



exports.getUserProductDetail = getProductDetail(
	"shop/product-detail",
	["/css/product-detail.css"],
	"product detail"
);

exports.displayProducts = (req, res, next) => {
	Product.getAllProducts()
		.then((products) => {
			res.render("shop/index", {
				products: products,
				docTitle: " My shop",
				path: "products",
			});
		})
		.catch((err) => {
			console.log(err)
			res.render("shop/index", {
				products: [],
				docTitle: " My shop",
				path: "products",
			});
		});
};

exports.indexPage = (req, res, next) => {
	Product._getAllProducts()
	.then((products) => {
		res.render("shop/index", {
			products: products,
			docTitle: " My shop",
			path: "products",
		});
	})
	.catch((err) => {
		console.log(err)
		res.render("shop/index", {
			products: [],
			docTitle: " My shop",
			path: "products",
		});
	});
};

exports.displayCart = (req, res, next) => {
	(async () => {
		const cart =  req.user.cart;
		const products =  cart.items;
		try {
			res.render("shop/cart", {
				products: products,
				totalPrice:cart.totalPrice,
				path: "cart",
				docTitle: "Cart",
				styles: ["/css/cart.css"],
			});
		} catch (err) {
			console.log(err);
		}
	})();
};

exports.addOrderHandler = (req, res, next) => {
	const user = req.user;
	(async () => {
		await user.order()
		try {
			
		res.status(200).json({ status: 200 });
		} catch (err) {
			console.log(err)
		}
		})();
};


exports.showOrders = (req,res,next) => {
	(async () => {
		const user = req.user;
		const orders = await user.getOrders()
		console.log(orders, "orders")
		res.render("shop/orders",{
			 orders:orders,
			path: "Orders",
			docTitle: "Orders",
		})
	})()
}
