const Product = require("../models/product-data");


exports.getProductDetail = (view,styles,docTitle)=> {
	return (req, res, next) => {
		Product.findByPk(req.params.id)
			.then(product => {
			{
				res.render(view, { styles: styles, product: product, docTitle: docTitle })
				console.log(product,"from row")
			}
		})
	}
}