const path = require("path");
const rootPath = require("../utils/path");
const cartPath = path.join(rootPath, "data", "cart.json");
const productPath = path.join(rootPath, "data", "products.json");
const CartProduct = require("../models/cart-data");
// const { getDataFromFile, writeToFile } = require("../utils/helpers");

// const addToCart = (id) => {
//     getDataFromFile(cartPath, (cartProducts) => {
//         //find the product in returned arr
//         const existedCardProductIndex = cartProducts.findIndex((product) => product.id == id);
// 		const existedCardProduct=cartProducts[existedCardProductIndex]
//         if (existedCardProduct) {
//             //if there update amount
// 			CartProduct.incrementAmount(existedCardProductIndex, cartProducts);
// 			console.log(existedCardProduct, "existedCArtProduct");
//         } else {
//             //else add new to cart
// 			getDataFromFile(productPath, (products) => {
// 				const product = products.find((prod) => prod.id === id);
// 				console.log(product, "product from products");
// 				const newCartProduct = new CartProduct(
// 					product.title,
// 					product.price,
// 					product.id,
// 					product.describtion
// 				);
// 				newCartProduct.save(cartPath);
// 				console.log(newCartProduct, "newcartProduct");
// 			});
// 		}
// 	});
// };


exports.postProductToCart = (req, res, next) => {
    CartProduct.addToCart(req.body.id);
    res.status(200).json({"status":200})
};

exports.updateProductsInData = (req,res,next) => {
    console.log(req.body)
    CartProduct.updateAmount(req.body);
	res.status(200).json({"status":200})
}

exports.deleteProduct = (req, res, next) => {
    const id = req.body.id
    console.log(id,"from delete product")
    CartProduct.deletecartProduct(id)
	res.status(200).json({"status":200})
}
