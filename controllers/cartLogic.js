// const Product = require("../models/product-data");
// const CartItem = require("../models/cart-item");
const User= require("../models/mongooseUser")

exports.postProductToCart = (req, res, next) => {
	const user = req.user
	// console.log(user instanceof User)
	const {id}=req.body
	user.addToCart(id).then(_ => {
		res.status(200).json({ status: 200 });
	}).catch(err => {
		console.log(err)
	})
};

exports.updateProductsInData = (req, res, next) => {
	(async () => {
			await req.user.updateCart(req.body)
		try {
			res.status(200).json({ status: 200 });
		} catch (err) {
			console.log(err);
		}
	})();
};

exports.deleteProduct = (req, res, next) => {
	const cart = req.user.cart;
	const id = req.body.id;
	const deletedItems = cart.items.find(item => item._id.toHexString() === id)
	const deletedProductTotalPrice = (+deletedItems.price) * (+deletedItems.qty);

	const user= req.user


	console.log(deletedItems, "deleteditem"); 
	console.log(deletedProductTotalPrice, "sdasdsadasdas");
	

	(async () => {
		await user.deleteProductFromCart(id)
		try {
			res.status(200).json({ status: 200 });
		} catch (err) {
			console.log(err);
		}
	})();
};
