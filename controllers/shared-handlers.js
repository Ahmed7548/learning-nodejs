const Product = require("../models/product-data");


exports.getProductDetail = (view,styles,docTitle)=> {
	return (req, res, next) => {
		console.log(req.params.id)
		Product.getOneProduct(req.params.id)
			.then(product => {
				res.render(view, { styles: styles, product: product, docTitle: docTitle })
			}).catch(err => {
				console.log(err)
			})
	}
}