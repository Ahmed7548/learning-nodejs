const path = require("path");
const rootPath = require("../utils/path");
const p = path.join(rootPath, "data", "products.json");
const {getDataFromFile,writeToFile}=require("../utils/helpers");
// const CartProduct = require("./cart-data");


// refactoring the code to make the code more effitient

    

module.exports = class product {
	constructor(title,price,id,describtion,url) {
        this.title = title;
        this.price = price
        this.id = id
        this.describtion = describtion
        this.url=url
    }
	save(p) {
		// products.push(this);
        getDataFromFile(p,products => {
            products.push(this);
            writeToFile(p,products)
        });
    }
    static fetchAll(p,cb) {
        // fs.readFile is asyncronous so we used callback here to render the data stored in the file
           getDataFromFile(p,cb)
    }
    static getsingleProduct(id,cb) {
        getDataFromFile(p, (products) => {
            cb(products.find(product => product.id === id))
        })
    }

    static editProduct(id,edittedProduct) {
        getDataFromFile(p, (products) => {
            const newProducts=products.map(product => {
                if (product.id === id) {
                    return edittedProduct
                } else {
                    return product
                }
            })
            writeToFile(p,newProducts)
        })
    }
    
    static deleteProduct(id,p) {
        getDataFromFile(p, (products) => {
            const newProducts = products.filter(product => product.id !== id)
            console.log(newProducts,"newProducts")
            writeToFile(p,newProducts)
        })
    }
};
