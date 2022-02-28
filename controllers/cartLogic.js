const Product = require("../models/product-data");
const CartItem = require("../models/cart-item");

exports.postProductToCart = (req, res, next) => {
	const user = req.user;
	let fethcedCart;
	let newQuantity = 1;
	user
		.getCart()
		.then((cart) => {
			fethcedCart = cart;
			return cart.getProducts({
				where: {
					id: req.body.id,
				},
			});
		})
		.then((products) => {
			let product;

			if (products.length) {
				product = products[0];
				const OldQuantuity = product.CartItem.quantity;
				newQuantity = OldQuantuity + 1;
				return product;
			} else {
				return Product.findByPk(req.body.id);
			}
		})
		.then((product) => {
			fethcedCart.addProduct(product, {
				through: {
					quantity: newQuantity,
				},
			});
		})
		.then((_) => {
			res.status(200).json({ status: 200 });
		});
};

exports.updateProductsInData = (req, res, next) => {
	(async () => {
		const cart = await req.user.getCart();
		const cartItems = await CartItem.findAll({
			where: {
				CartId: cart.id,
			},
		});
		for (let key in req.body) {
			const id = key;
			const amount = req.body[key];
			try {
				const cartItem = await cartItems.find((item) => item.ProductId === id);
				await cartItem.update({ quantity: amount });
			} catch (err) {
				console.log(err);
			}
		}
		res.status(200).json({ status: 200 });
	})();
};

exports.deleteProduct = (req, res, next) => {
	const user = req.user;
	const id = req.body.id;

	(async () => {
		const cart = await user.getCart();
		const products = await cart.getProducts({
			where: {
				id: id,
			},
		});
		const product = products[0];
		cart.removeProduct(product);
		try {
			res.status(200).json({ status: 200 });
		} catch (err) {
			console.log(err);
		}
	})();
};
