const clickButton = document.querySelectorAll(".button");


clickButton.forEach(btn => {
    btn.addEventListener("click", addToCarritoItem
    )

})

function addToCarritoItem(e) {
    const boton = e.target
    console.log(boton)
}