const Product = require("../models/product-data");
const { getProductDetail } = require("./shared-handlers");

exports.getAddProduct = (req, res, next) => {
	res.render("admin/add-product", {
		pageTitle: "add product",
		path: "add-product",
		docTitle: "add prodcuct",
	});
};

exports.getAdminProdctDetail = getProductDetail(
	"admin/edit-product",
	["/css/admin-edit-product.css"],
	"Edit product"
);

exports.postAddedProduct = (req, res, next) => {
	const user= req.user
	const { title, describtion, price, image_url } = req.body;
	const product = new Product(title, price, describtion, image_url,user._id)
		product.save()
		.then(() => {
			res.redirect("/admin/admin-products");
		})
		.catch((err) => {
			console.log(err,"hehe");
		});
};

exports.postEdittedProduct = (req, res, next) => {
	console.log(req.body);
	const { title, price, describtion, image_url } = req.body;
	const updatedProduct= new Product(title,price,describtion,image_url)
	const id = req.params.id;
	updatedProduct.UpdateProduct(id)
		.then((result) => {
			console.log(result);
			res.redirect("/admin/admin-products");
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postDeleteProduct = (req, res, next) => {
	const id = req.body.id;
	Product.deleteProduct(id).then((result) => {
		console.log(result);
		res.status(200).json({ status: 200 });
	}).catch(err => {
		console.log(err)
	});
};

exports.displayAdminProducts = (req, res, next) => {
	Product._getAllProducts().then((products) => {
		res.render("admin/product", {
			products: products,
			docTitle: "Admin products",
			path: "admin-products",
			styles: ["/css/adminProducts.css"],
		});
	});
};
