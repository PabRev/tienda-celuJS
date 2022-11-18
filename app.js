
const clickButton = document.querySelectorAll(".button");
const tbody = document.querySelector(".tbody");
let carrito = [];
let valido = false;



//datos de la Card
const addToCarritoItem = (e) => {
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
    
}

//registro los botones de agregar
clickButton.forEach(btn => {
    btn.addEventListener("click", addToCarritoItem)
})


//agrego al carrito
const addItemCarrito = (newItem) =>{


    const alert = document.querySelector('.alert');
    setTimeout(function(){
        alert.classList.add('hide')
        }, 2000)
        alert.classList.remove('hide')



    const inputElemento = tbody.getElementsByClassName('input__elemento')
   
    //reviso si ya tengo una unidad agregada y la sumo
    for(let i=0; i<carrito.length; i++){
        if(carrito[i].titulo.trim() == newItem.titulo.trim()){
            carrito[i].cantidad ++;
            const inputValue = inputElemento[i];
            inputValue.value ++;
            carritoTotal()
            return null;
    }}
    
    //agrego al Array
    carrito.push(newItem);
    renderCarrito();
}

//sumo el total del carrito
const carritoTotal = () => {
    let total = 0;
    const itemCartTotal = document.querySelector(".itemCartTotal");
    carrito.forEach((item) => {
        const precio = +(item.precio.replace('$', ''))
        total = total + precio*item.cantidad
    })
    

        itemCartTotal.innerHTML =  `Total: $ ${total}`;
        addLocalStorage()
}


//muestro el carrito
const renderCarrito = () => {
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

        tr.querySelector(".delete").addEventListener("click", removeItemCarrito);
        tr.querySelector('.input__elemento').addEventListener('change', sumaCantidad)
    })
    carritoTotal()
}

const removeItemCarrito = (e) => {
    const buttonDelete = e.target
    const tr = buttonDelete.closest(".itemCarrito");
    const title = tr.querySelector(".title").textContent;

    for(let i=0; i<carrito.length; i++) {

        //optimice la validacion con la sintaxis abreviada
        carrito[i].titulo.trim() === title.trim() ? carrito.splice(i, 1) : null
        
    }

    tr.remove()
    carritoTotal()
}

const sumaCantidad = (e) => {
    const sumaInput = e.target;
    const tr = sumaInput.closest('.itemCarrito');
    const title = tr.querySelector('.title').textContent;
    carrito.forEach(item => {
       if(item.titulo.trim() === title){

            //optimice validacion con sintaxis abreviada
           sumaInput.value < 1 ? (sumaInput = 1) : sumaInput.value;
           
           item.cantidad = sumaInput.value;
           carritoTotal()
       }
    })
}


function addLocalStorage(){
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

window.onload = function(){
    const storage = JSON.parse(localStorage.getItem('carrito'));
        if (storage){
            carrito = storage;
            renderCarrito();
        }
}