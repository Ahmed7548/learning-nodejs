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

const Sequelize = require("sequelize");

const sequelize = require("../utils/data-base");

const Product = sequelize.define("Product", {
	id: {
		type: Sequelize.STRING,
		primaryKey: true,
		allowNull: false,
		unique: true,
	},
	title: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	price: {
		type: Sequelize.DOUBLE,
		allowNull: false,
	},
	describtion: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	img_URL: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

module.exports = Product;
