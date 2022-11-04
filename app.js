
/* controlador del prompt. Ya se puede manejar desde el Dom
let comprar = true;
let precio = 0;
while(comprar){
    let prod = prompt("Que producto estas buscando? A)Producto 1  B)Producto 2 C)Producto 3")
        if(prod === "A"){
            precio = 200;
            alert("Compraste un producto por $200");
            
        }
        else if(prod === "B"){
            precio = 400;
            alert("Compraste un producto por $400");
            
        }
        else if(prod === "C"){
            precio = 600;
            alert("Compraste un producto por $200");
            
        }
        else{
            alert("No ingresaste un producto valido, ingresa A, B o C")
        }

        let seguir = prompt("Desea seguir comprando?");
        if(seguir === "Si"){comprar = true}
        else if(seguir === "No"){comprar = false}
}*/


const clickButton = document.querySelectorAll(".button");
const tbody = document.querySelector(".tbody");
let carrito = [];


clickButton.forEach(btn => {
    btn.addEventListener("click", addToCarritoItem)
})

function addToCarritoItem(e) {
    const button = e.target;
    const item = button.closest('.card');
    const itemTitle = item.querySelector('.card-title').textContent;
    const itemPrice = item.querySelector('.precio').textContent;
    const itemImg = item.querySelector('.card-img-top').src

    const newItem = {
        titulo : itemTitle,
        precio : itemPrice,
        imagen : itemImg,
        cantidad : 1
    }

    addItemCarrito(newItem);
    prodAgregado(itemTitle, itemPrice)
}

function addItemCarrito(newItem){

    const inputElemento = tbody.getElementsByClassName('input__elemento')

    for(let i=0; i<carrito.length; i++){
        if(carrito[i].titulo.trim() == newItem.titulo.trim()){
            carrito[i].cantidad ++;
            const inputValue = inputElemento[i];
            inputValue.value ++;
            console.log(carrito)
            return null;
    }}

    carrito.push(newItem);
    renderCarrito();
}
function prodAgregado(itemTitle,itemPrice){
    alert("Agregaste un " + itemTitle + "por un valor de " + itemPrice)
}
function renderCarrito(){
    tbody.innerHTML = " ";
    carrito.map(item =>{
        const tr = document.createElement("tr");
        tr.classList.add("itemCarrito");
        const Content = `
        <th scope="row">1</th>
        <td class="table__productos">
        <img src=${item.imagen} class="border" alt="celular">  
        <h6 class="title m-2">${item.titulo}</h6>
        </td>

        <td class="table__precio">
          <p>${item.precio}</p>
        </td>
        <td class="table__cantidad">
          <input type="number" min="1" value=${item.cantidad} class='input__elemento'>
          <button class="delete btn btn-danger">X</button>
        </td>
        `

        tr.innerHTML = Content;
        tbody.append(tr)
    })
}