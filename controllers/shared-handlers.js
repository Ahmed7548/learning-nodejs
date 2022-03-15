const Product = require("../models/product-data");


exports.getProductDetail = (view,styles,docTitle)=> {
	return (req, res, next) => {
		console.log(req.params.id)
		Product._getOneProduct(req.params.id)
			.then(product => {
				res.render(view, { styles: styles, product: product, docTitle: docTitle })
				// console.log(product,"from row")
			}).catch(err => {
				console.log(err)
			})
	}
}