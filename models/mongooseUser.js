const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const Product = require("./product-data");
const Order = require("./order");

const cartSchema = new mongoose.Schema({
	items: [],
	totalPrice: {
		type: Number,
		default: 0,
	},
});
const userSchema = new mongoose.Schema({
	userName: String,
	email: String,
	cart: cartSchema,
});

// method on the user doc too add to cart
userSchema.methods.addToCart = async function (id) {
	const product = await Product.getOneProduct(id);
	const cart = this.cart;

	cart.totalPrice = product.price + cart.totalPrice;

	const productInItemIndex = cart.items.findIndex(
		(item) => item._id.toHexString() === id
	);

	let newProductInCart;
	if (productInItemIndex >= 0) {
		// if it already exist in the cart
		newProductInCart = cart.items[productInItemIndex];
		newProductInCart.qty = +newProductInCart.qty + 1;

		return User.updateOne(
			{ _id: this._id, "cart.items._id": new ObjectId(id) },
			{
				$set: {
					"cart.items.$": newProductInCart,
					"cart.totalPrice": cart.totalPrice,
				},
			}
		);
	} else {
		// if not in cart
		newProductInCart = { ...product._doc, qty: 1 };
		this.cart.items.push(newProductInCart);
		return await this.save();
	}
};

userSchema.methods.updateCart = async function (idAmountPair) {
	let totalPrice = 0;
	const newItems = this.cart.items.map((item) => {
		console.log(idAmountPair[item._id.toHexString()]);
		item.qty = idAmountPair[item._id.toHexString()];

		totalPrice += item.price * item.qty;

		return item;
	});
	this.cart = { items: [...newItems], totalPrice };

	return await this.save();
};

userSchema.methods.deleteProductFromCart = async function (productId) {
	const itemIndex = this.cart.items.findIndex(
		(item) => item._id.toHexString() === productId
	);

	const [deletedItem] = this.cart.items.splice(itemIndex, itemIndex + 1);

	console.log(this.cart.totalPrice, deletedItem.price);
	this.cart.totalPrice -= +(deletedItem.price * deletedItem.qty);

	return await this.save();
};

userSchema.methods.order = async function () {
	const order = new Order({
		userId: this._id,
		products: [...this.cart.items],
	});
	await order.save();
	try {
		this.cart.items = [];
		this.cart.totalPrice = 0;
		await this.save();
	} catch (err) {
		return new Error(err);
	}
};

const User = mongoose.model("user", userSchema);

module.exports = {
	User,
};
