const buttons = Array.from(document.querySelectorAll(".btn"))
console.log(buttons)
const products = document.querySelectorAll(".card")



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

const goProductDetail = (e,product) => {
    const id=product.dataset.id
    if (!buttons.includes(e.target)) {
        location.assign(`/shop/product-detail/${id}`)
    }
}

buttons.forEach(button => {
    button.addEventListener("click",addToCard)
})

products.forEach(product => {
    product.addEventListener("click", (e) => {
        goProductDetail(e,product)
    })
})