let edad = prompt("Sos mayor de 18 años?")
if(edad == "no"){
    alert("Te recomendamos comprar en esta pagina acompañado de un adulto")
}

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
          <input type="number" min="1" value=${item.cantidad}>
          <button class="delete btn btn-danger">X</button>
        </td>
        `

        tr.innerHTML = Content;
        tbody.append(tr)
    })
}