const path = require("path");
const rootPath = require("../utils/path");
const p = path.join(rootPath, "data", "cart.json");
const cartPath = path.join(rootPath, "data", "cart.json");
const productPath = path.join(rootPath, "data", "products.json");

const Product = require("./product-data");
const { writeToFile, getDataFromFile } = require("../utils/helpers");

module.exports = class CartProduct extends Product {
	constructor(title, price, id, describtion) {
		super(title, price, id, describtion);
		this.amount = 1;
	}

	static incrementAmount(ind, cart) {
		// const newProducts = products.map(product => {
		//     if (product.id === id) {
		//         return {...product,amount:++product.amount}
		//     } else {
		//         return product
		//     }
		// })

		//why this approach not the other---> not to make to many loops

		const updatedProduct = {
			...cart.cartProducts[ind],
			amount: ++cart.cartProducts[ind].amount,
		};
		const updatedProducts = [...cart.cartProducts];
		updatedProducts[ind] = updatedProduct;
		const newCart = {
			totalPrice: +cart.totalPrice + +updatedProduct.price,
			cartProducts: [...updatedProducts],
		};

		writeToFile(p, newCart);
	}

	static addToCart = (id) => {
		getDataFromFile(
			cartPath,
			(cart) => {
				//see if product is already added to array
				const existedCardProductIndex = cart.cartProducts.findIndex(
					(product) => product.id == id
				);
				const existedCardProduct = cart.cartProducts[existedCardProductIndex];
				if (existedCardProduct) {
					//if there update amount
					CartProduct.incrementAmount(existedCardProductIndex, cart);
					console.log(existedCardProduct, "existedCArtProduct");
				} else {
					//else add new to cart
					getDataFromFile(productPath, (products) => {
						const product = products.find((prod) => prod.id === id);
						console.log(product, "product from products");
						const newCartProduct = new CartProduct(
							product.title,
							product.price,
							product.id,
							product.describtion
						);
						// newCartProduct.save(cartPath);
						const newCartProducts = [...cart.cartProducts];
						newCartProducts.push(newCartProduct);
						const newCart = {
							totalPrice: +cart.totalPrice + +newCartProduct.price,
							cartProducts: [...newCartProducts],
						};
						writeToFile(cartPath, newCart);
						console.log(newCart, "newcartProducts");
					});
				}
			},
			{ totalPrice: 0, cartProducts: [] }
		);
	};

	static updateAmount(idAmountPairArr) {
		console.log(idAmountPairArr, "aaaa");
		getDataFromFile(p, (cart) => {
			let newCart = { ...cart };
			const newProducts = cart.cartProducts.map((product) => {
				for (let key in idAmountPairArr) {
					console.log(key, "this is key    ");
					if (product.id === key) {
						const addedTotalPrice =
							(+idAmountPairArr[key] - +product.amount) * +product.price;
						newCart.totalPrice += addedTotalPrice;
						return { ...product, amount: idAmountPairArr[key] };
					} else {
						return product;
					}
				}
			});
			newCart.cartProducts = newProducts;
			// console.log(newProducts,"new products from updatecartdata")
			writeToFile(p, newCart);
		});
	}

	static deletecartProduct(id) {
        getDataFromFile(cartPath, (cart) => {
			let newTotalPrice;
			const newProducts = cart.cartProducts.filter((product) => {
				if (product.id === id) {
					newTotalPrice = cart.totalPrice - +product.price * +product.amount;
                    return false;
                } else {
                    return true
                }
            });
            if(typeof newTotalPrice!=="undefined"){
                const newCart = { cartProducts: newProducts, totalPrice: newTotalPrice };
                writeToFile(cartPath,newCart)
            }
		});
	}
};
