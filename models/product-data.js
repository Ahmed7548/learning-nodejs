const mongoose = require("mongoose")
const {ObjectId}=require("mongodb")

const productSchema = new mongoose.Schema({
	title: String,
	price: Number,
	description: String,
	img_URL: String,
})

const product=mongoose.model("product",productSchema)




const { getDb } = require("../utils/data-base");
const mongoDb = require("mongodb")



class Product {
	constructor(title, price, description, imageURL,userId) {
		this.productDoc = new product({
			title: title,
			price: price,
			description: description,
			img_URL:imageURL
		})
	}

	async saveProduct() {
		// const db = getDb();
		// const shop = db.collection("shop");
		// await shop.insertOne({
		// 	title: this.title,
		// 	price: this.price,
		// 	description: this.description,
		// 	img_URL: this.img_URL,
		// });
		await this.productDoc.save()
		try {
			return Promise.resolve();
		} catch (err) {
			throw new Error("somethimg went wrong");
		}
	}

	static getAllProducts() {
		return (async () => {
			const allProducts = await product.find()
			try {
				return allProducts;
			} catch (err) {
				throw err;
			}
		})();
	}

	UpdateProduct(id) {
		return (async () => {
			const o_id = new ObjectId(id);
			const {title,price,description,img_URL}=this.productDoc
			const result = await product.updateOne({ _id: o_id },{$set:{title,price,description,img_URL}})
			return result
		})()
		
	}
	static getOneProduct(id) {
		return (async () => {
			return await product.findOne({_id:new ObjectId(id)}) ;
		})();
	}
	
	static deleteProduct(id) {
		return (async () => {
			return  await product.deleteOne({_id:new ObjectId(id)});
		})();
	}

}

module.exports = Product;
