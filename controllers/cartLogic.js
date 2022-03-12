// const Product = require("../models/product-data");
// const CartItem = require("../models/cart-item");
const User= require("../models/user")

exports.postProductToCart = (req, res, next) => {
	const user = req.user;
	console.log(user instanceof User)
	const {id}=req.body
	console.log(id)
	user.addtoCart(id).then(_ => {
		res.status(200).json({ status: 200 });
	}).catch(err => {
		console.log(err)
	})
};

exports.updateProductsInData = (req, res, next) => {
	(async () => {
			await req.user.updatedCart(req.body)
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


	console.log(deletedItems, "deleteditem"); 
	console.log(deletedProductTotalPrice, "sdasdsadasdas");
	

	(async () => {
		await User.deleteProductFromCart(id,req.user._id,deletedProductTotalPrice)
		try {
			res.status(200).json({ status: 200 });
		} catch (err) {
			console.log(err);
		}
	})();
};
