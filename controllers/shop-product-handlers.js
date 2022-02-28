const Product = require("../models/product-data");
const OrderItem= require("../models/order-item")
const { getProductDetail } = require("./shared-handlers");

const uid = () => {
	return (
		String.fromCharCode(Math.floor(Math.random() * 26) + 97) +
		Math.random().toString(16).slice(2) +
		Date.now().toString(16).slice(4)
	);
};

exports.getUserProductDetail = getProductDetail(
	"shop/product-detail",
	["/css/product-detail.css"],
	"product detail"
);

exports.displayProducts = (req, res, next) => {
	Product.findAll()
		.then((products) => {
			res.render("shop/index", {
				products: products,
				docTitle: " My shop",
				path: "products",
			});
		})
		.catch((err) => console.log(err));
};

exports.indexPage = (req, res, next) => {
	Product.findAll()
		.then((products) => {
			res.render("shop/index", {
				products: products,
				docTitle: " My shop",
				path: "products",
			});
		})
		.catch((err) => console.log(err));
};

exports.displayCart = (req, res, next) => {
	(async () => {
		const cart = await req.user.getCart();
		const products = await cart.getProducts();
		try {
			res.render("shop/cart", {
				products: products,
				// totalPrice:cart.totalPrice,
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
	// this code will be moved to the the check out order
	(async () => {
		//get the cart // get the cart products// add each product to the order// go to check out page
		console.log("work1");
		const cart = await user.getCart();
		console.log(cart, "cart");
		const products = await cart.getProducts();
		console.log(products, "product");
		const order = await user.createOrder();
		console.log(order, "order");
		try {
			products.forEach(async (product) => {
				console.log("work2");
				await order.addProduct(product, {
					through: {
						quantity: product.CartItem.quantity,
					},
				});
				try {
					// res.render("/shop/order");
					await cart.setProducts(null)
					// res.redirect("/shop/orders")
				} catch (err) {
					console.log(err);
				}
			});
			res.status(200).json({ status: 200 });
		} catch (err) {
			console.log(err);
		}
	})();
};


exports.showOrders = (req,res,next) => {
	(async () => {
		const user = req.user;
		const orders = await user.getOrders({include:[Product]})
		console.log(orders, "orders")
		res.render("shop/orders",{
			 orders:orders,
			// totalPrice:cart.totalPrice,
			path: "Orders",
			docTitle: "Orders",
		})
	})()
}
