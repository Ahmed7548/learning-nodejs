// const path = require("path");
// const rootPath = require("../utils/path");
// const p = path.join(rootPath, "data", "products.json");
// const {getDataFromFile,writeToFile}=require("../utils/helpers");
// const db=require("../utils/data-base");

// module.exports = class product {
// 	constructor(title,price,id,describtion,url) {
//         this.title = title;
//         this.price = price
//         this.id = id
//         this.describtion = describtion
//         this.url=url
//     }
// 	save() {
// 		// products.push(this);
//        return db.execute(`INSERT INTO products (idproducts,title,price,description,img_URL)
//         VALUES (?,?,?,?,?)`,[this.id,this.title,this.price,this.describtion,this.url])
//     }
//     static fetchAll() {
//         // the return is a promise and we cane use async function or then catch too chain actions
//         return db.execute("SELECT * FROM products")
//     }
//     static getsingleProduct(id) {
//         return db.execute(`SELECT * FROM products WHERE id=?`,[id])
//     }

//     static editProduct(id, edittedProduct) {
//         return db.execute(`UPDATE products
//         SET title = ?, price = ?, describtion = ?, img_URL=?
//         WHERE id=?;`,[edittedProduct.title,edittedProduct.price,edittedProduct.describtion,edittedProduct.url,id])
//     }

//     static deleteProduct(id) {
//        return db.execute("DELETE FROM products WHERE id=?",[id])
//     }
// };

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

	static _getAllProducts() {
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
	static _getOneProduct(id) {
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
