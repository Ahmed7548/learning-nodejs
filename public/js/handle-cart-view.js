const numInputs = document.querySelectorAll(
	".cart__amount__input__container input"
);
const removeButton = document.querySelectorAll(
	".cart__amount__input__container .remove"
);
const closeButton = document.getElementById("close");
const checkout = document.getElementById("check-out");

const productsContainer = document.getElementById("products-container")

const totalPriceView=document.getElementById("total-price")


const updateTotalPrice = () => {
	const numInputs = document.querySelectorAll(
		".cart__amount__input__container input"
	);
	let totalPrice=0
	numInputs.forEach(numInput => {
		const price = +numInput.dataset.price
		const amount= +numInput.value
		totalPrice+= amount*price
	})
	totalPriceView.innerText= `$${totalPrice}`
}



const removeFromCart = (e) => {
    const id = e.target.dataset.id;
	const fetchData = async () => {
		const response = await fetch("/shop/products/updateCart/delete", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id }),
		});
		try {
            if (response.ok) {
                //remove the node from the UI
                const parent=document.getElementById(`cart${id} `)
                parent.remove();
                //check if all prodcuts is deleted 
                if (!productsContainer.firstElementChild) {
                    productsContainer.innerHTML=`<h3>no products added</h3>`
				}
				//
				updateTotalPrice()
			} else {
				throw new Error(
					"something went wrong and couldn't remove product from cart"
				);
			}
		} catch (err) {
			console.log(err);
		}
	};
	fetchData();
};

const updateCart = async (whereTo) => {
	const idAmountPair = {};
	numInputs.forEach((input) => {
		idAmountPair[input.dataset.id] = input.value;
	});
	const response = await fetch("/shop/products/updateCart", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(idAmountPair),
	});
	try {
		if (response.ok) {
			location.assign(whereTo);
		} else {
			throw new Error("there hase ben an error");
		}
	} catch (e) {
		console.log(e);
	}
};

const controlValue = (e) => {
	if (e.target.value <= 0) {
		console.log(e.target.value);
		e.target.value = 1;
	}
};

closeButton.addEventListener("click", () => {
	updateCart("/shop/products");
});

checkout.addEventListener("click", () => {
	updateCart("/shop/checkout");
});

numInputs.forEach((input) => {
	input.addEventListener("keyup", (e) => {
		controlValue(e)
		updateTotalPrice()
	});
	input.addEventListener("click", (e) => {
		controlValue(e)
		updateTotalPrice()
	});
});

removeButton.forEach((button) => {
	button.addEventListener("click", (e) => {
		removeFromCart(e)
	});
});
