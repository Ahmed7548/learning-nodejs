const { ObjectId } = require("mongodb");
const Product = require("./product-data");
const mongoose = require("mongoose")
// const cartSchema = new mongoose.Schema({
// 	items: Array,
// 	totalPrice:Number
// })
// const userSchema = new mongoose.Schema({
// 	userName: String,
// 	email: String,
// 	cart:cartSchema
// })


// const user=mongoose.model("user",userSchema)
class User {
	constructor(userDoc) {
		// this.userName = userName;
        // this.email = email;
        // this._id=_id
		// this.cart = cart;
		this.userDoc = userDoc 
	}

	async save() {
		// const db = getDb();
		// const users = await db.collection("users");
		return await this.save();
	}

	 async addtoCart(productId) {
		const product = await Product.getOneProduct(productId);
		const cart = this.userDoc.cart;
		console.log(cart, "from user User")
		const updatedTotalPrice=cart.totalPrice+(+product.price)

		//get the product from the database
		const productInCartIndex = cart.items.findIndex(
			(item) => item._id.toHexString() === product._id.toHexString()
		);
            const productInCart=cart.items[productInCartIndex]
		//if product in cart update product
		if (productInCart) {
			productInCart.qty += 1;
			console.log(this.userDoc._id)
			return await user.updateOne(
				{
					_id: this.userDoc._id,
					"cart.items._id": new ObjectId(productId),
				},
				{
					$set: {
						"cart.items.$": productInCart,
						"cart.totalPrice": updatedTotalPrice,
					},
				}
			);
		}
		// if new product
		else {
            const updatedProductInCart = { ...product._doc, qty: 1 };
			console.log(updatedProductInCart,"product")
			
            cart.items.push(updatedProductInCart)
			console.log(this.userDoc.id)
			return await user.updateOne(
				{ _id: this.userDoc._id },
				{
					$push: {
						"cart.items": updatedProductInCart,
					},
					$set: {
						"cart.totalPrice": updatedTotalPrice,
					},
				}
			);
		}
	}

	async updatedCart(idAmountPair) {
		const db = getDb();
		const users = db.collection("users");
		let totalPrice = 0;
		const updatedCartItems = [];
		const cart = this.cart;
		if (cart.items.length > 0) {
			for (let key in idAmountPair) {
				const id = key;
				const amount = idAmountPair[key];
				console.log(idAmountPair);

				const cartItemIndex = cart.items.findIndex(
					(item) => item._id.toHexString() === id
				);
                const cartItem=cart.items[cartItemIndex]
				console.log(cartItem, "cartItem");
				cartItem.qty = +amount;
				updatedCartItems.push(cartItem);
				totalPrice += +amount * +cartItem.price;
			}
			console.log(
				JSON.stringify(cart.items) === JSON.stringify(updatedCartItems),
				"???????"
			);
		}
		const updatedCart = { items: updatedCartItems, totalPrice };
		return await users.updateOne(
			{ _id: new ObjectId(this._id) },
			{
				$set: {
					cart: updatedCart,
				},
			}
		);
	}

	static async deleteProductFromCart(productId, userId, subtractedPrice) {
		const db = getDb();
		const users = db.collection("users");
		return await users.updateOne(
			{ _id: new ObjectId(userId) },
			{
				$pull: {
					"cart.items": { _id: new ObjectId(productId) },
				},
				$inc: {
					"cart.totalPrice": -subtractedPrice,
				},
			}
		);
	}

	static async findById(id) {
		// const db = getDb();
		// const users = await db.collection("users");
		
		// return await user.findOne({_id:ObjectId(id)});
    }
    
    async order() {
        const db = getDb()
        const orders = await db.collection("orders");
        await orders.insertOne({ ...this.cart, userId: this._id })
        try {
            await db.collection("users").updateOne({ _id: new ObjectId(this._id) }, {
                $set: {
                    cart: {
                        items: [],
                        totalPrice:0
                    }
                }
            })
            this.cart = {
                items: [],
                totalPrice:0
            }
        } catch (err) {
            throw new Error(err)
        }
    }
    async getOrders() {
        const db = getDb();
        const Orders = db.collection("orders")
        const orders = await Orders.find({ userId: new ObjectId(this._id) }).toArray()
        return orders
    }
}

module.exports = User;
