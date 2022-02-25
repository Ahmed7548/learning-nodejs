const Product = require("../models/product-data");
const path = require("path");
const rootPath = require("../utils/path");
const { getProductDetail } = require("./shared-handlers");

const uid = () => {
	return (
		String.fromCharCode(Math.floor(Math.random() * 26) + 97) +
		Math.random().toString(16).slice(2) +
		Date.now().toString(16).slice(4)
	);
};

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
	const { title, describtion, price, image_url } = req.body;
	console.log(req.user, "user");
	req.user
		.createProduct({
			id: uid(),
			title: title,
			describtion: describtion,
			img_URL: image_url,
			price: price,
		})
		.then(() => {
			console.log("added product to the database");
			res.redirect("/admin/admin-products");
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postEdittedProduct = (req, res, next) => {
	console.log(req.body);
	const { title, price, describtion, image_url } = req.body;
	const id = req.params.id;
	Product.update(
		{
			price: price,
			title: title,
			describtion: describtion,
			img_URL: image_url,
		},
		{
			where: {
				id: id,
				UserId:req.user.id
			},
		}
	)
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
	Product.destroy({
		where: {
			id: id,
			UserId:req.user.id
		},
	}).then((result) => {
		console.log(result);
		res.status(200).json({ status: 200 });
	});
};

exports.displayAdminProducts = (req, res, next) => {
	Product.findAll({
		where: {
		UserId:req.user.id
	}}).then((products) => {
		res.render("admin/product", {
			products: products,
			docTitle: "Admin products",
			path: "admin-products",
			styles: ["/css/adminProducts.css"],
		});
	});
};
