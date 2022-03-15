const titleInput = document.getElementById("title")
const titlePreview = document.querySelector(".product__title")
//
const describtionInput = document.getElementById("describtion")
const descriptionPreview = document.querySelector(".product__describtion")
//
const priceInput = document.getElementById("price")
const pricePreview = document.querySelector(".product__price")
//
const imageUrlInput = document.getElementById("image_url")
const imagePreview= document.querySelector(".card__image img")



titleInput.addEventListener("keyup", (e) => {
    console.log(e.target.value)
    titlePreview.innerText=e.target.value
})

describtionInput.addEventListener("keyup", (e) => {
    console.log(e.target.value)
    descriptionPreview.innerText=e.target.value
})

priceInput.addEventListener("keyup", (e) => {
    console.log(e.target.value)
    pricePreview.innerText="$"+e.target.value
})

imageUrlInput.addEventListener("keyup", (e) => {
    console.log(e.target.value)
    imagePreview.src=(() => {
        try {
            const _url = new URL(e.target.value)
            return _url
        } catch{
            return null
        }}
    )()
})