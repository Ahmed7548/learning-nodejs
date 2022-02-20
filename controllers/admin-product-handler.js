const Product = require("../models/product-data");
const path = require("path");
const rootPath = require("../utils/path");
const CartProduct = require("../models/cart-data");
const productPath = path.join(rootPath, "data", "products.json");


const uid = () => {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
		 + Math.random().toString(16).slice(2)
		 + Date.now().toString(16).slice(4);
  }

exports.getAddProduct = (req, res, next) => {
	res.render("admin/add-product", {
		pageTitle: "add product",
		path: "add-product",
		docTitle: "add prodcuct",
	});
};

const getProductDetail = (view,styles,docTitle)=> {
	return (req, res, next) => {
		Product.getsingleProduct(req.params.id, (product) => {
			res.render(view,{styles:styles,product:product,docTitle:docTitle})
		})
	}
}

exports.getAdminProdcrDetail=getProductDetail("admin/edit-product",["/css/admin-edit-product.css"],"Edit product")


exports.postAddedProduct = (req, res, next) => {
	console.log(req.body);
	const product = new Product(req.body.title,req.body.price,uid(),req.body.describtion,req.body.image_url);
	product.save(productPath);
	res.redirect("/shop/products");
};

exports.postEdittedProduct = (req, res, next) => {
	console.log(req.body)
	const {title,price,describtion,image_url}=req.body
	const id = req.params.id
	const edditedProduct = new Product(title, price, id, describtion, image_url)
	console.log(edditedProduct)
	Product.editProduct(id, edditedProduct)
	res.redirect("/admin/admin-products")
}


exports.postDeleteProduct = (req, res, next) => {
	const id = req.body.id
	console.log(id,"check")
	Product.deleteProduct(id, productPath)
	CartProduct.deletecartProduct(id)
    res.status(200).json({"status":200})
}


exports.displayAdminProducts =  (req, res, next) => {
	Product.fetchAll(productPath,(products) => {
		res.render("admin/product", {
			products,
			docTitle: "Admin products",
			path: "admin-products",
			styles:["/css/adminProducts.css"]
		});
	});
};

