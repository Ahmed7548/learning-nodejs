const addToCart = document.getElementById("add-to-cart")


const addToCard = (e) => {
    console.log("work")
    const id=e.target.dataset.id
    console.log(id)
    fetch("/shop/products/addToCart", {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify({id})
    }).then(res=>res.json()).then(res=>console.log(res))
}


addToCart.addEventListener("click",addToCard)