
const buttons = Array.from(document.querySelectorAll("button.btn"))
const modaloverlay = document.getElementById("modal-overlay")
const modal = document.getElementById("confirm-delete")
const deleteButton=document.getElementById("delete")
const cancelButton=document.getElementById("cancel")

const removeModal = (e) => {
    console.log(e.target!==modal)
    if ((e.target !== modal&&  e.target!==deleteButton)||e.target===cancelButton) {
        modaloverlay.classList.remove("active")
        document.removeEventListener("click",removeModal,true)
    }
}



buttons.forEach(button => {
    button.addEventListener("click", () => {
        modaloverlay.classList.add("active")
        deleteButton.dataset.id = button.dataset.id
        console.log( deleteButton.dataset.id)
        document.addEventListener("click", removeModal, true)
    },true)
})


deleteButton.addEventListener("click", (e) => {
    const id = e.target.dataset.id
    fetch("/admin/delete-product", {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify({id})
    }).then(() => {
        location.assign("/admin/admin-products")
    })
})
