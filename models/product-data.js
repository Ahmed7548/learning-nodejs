const { getDb } = require("../utils/data-base");
const mongoDb = require("mongodb")

class Product {
	constructor(title, price, description, imageURL,userId) {
		this.title = title;
		this.price = price;
		this.description = description;
		this.img_URL = imageURL;
		this.userId=userId
	}

	async save() {
		const db = getDb();
		const shop = db.collection("shop");
		await shop.insertOne({
			title: this.title,
			price: this.price,
			description: this.description,
			img_URL: this.img_URL,
		});
		try {
			return Promise.resolve();
		} catch (err) {
			throw new Error("somethimg went wrong");
		}
	}

	static getAllProducts() {
		return (async () => {
			const db = getDb();
			const shop = await db.collection("shop");
			const allProducts = await shop.find();
			try {
				return allProducts.toArray();
			} catch (err) {
				throw err;
			}
		})();
	}

	UpdateProduct(id) {
		return (async () => {
			const db = getDb();
			const shop = await db.collection("shop")
			const o_id = new mongoDb.ObjectId(id);
			const result = await shop.updateOne({ _id: o_id }, { $set:this})
			return result
		})()
		
	}
	static getOneProduct(id) {
		return (async () => {
			const db = getDb();
			const shop = await db.collection("shop");
			const o_id = new mongoDb.ObjectId(id.toString())
			const product = await shop.find({ _id: o_id}).next();
			return  product ;
		})();
	}
	
	static deleteProduct(id) {
		return (async () => {
			const db = getDb();
			const shop = await db.collection("shop");
			const o_id = new mongoDb.ObjectId(id.toString())
			const result = await shop.deleteOne({ _id: o_id})
			return  result ;
		})();
	}

}

module.exports = Product;
