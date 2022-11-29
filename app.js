fetch("productosJSON.json")
    .then((res)=>res.json())
    .then((data) => {
        data.forEach((producto)=>{
            const containerProductos = document.getElementById('containerProductos');
            const divCard = document.createElement('div');
            const card = `<div class="card shadow mb-1 rounded" style="width: 18rem;">
            <img src="${producto.imagen}" class="card-img-top" alt="celular">
            <div class="card-body">
              <h5 class="card-title">${producto.titulo}</h5>
              <h5 class="card-title text-muted">Precio: <span class="precio">${producto.precio}</span></h5>
              <p class="card-text text-muted">Some quick example text to build on the card title and make up the bulk of
                the card's content.</p>
              <button href="#" class="btn btn-primary button" id="buttonAdd-${producto.id}">Añadir al carrito</button>
            </div>
          </div>`
          divCard.innerHTML = card;
          containerProductos.appendChild(divCard);
          const buttonAdd = document.getElementById(`buttonAdd-${producto.id}`)
          buttonAdd.addEventListener('click', (e) => {
                addToCarritoItem(producto)
          })
        })
    })

const clickButton = document.querySelectorAll(".button");
const tbody = document.querySelector(".tbody");
let carrito = [];
let valido = false;






//datos de la Card
const addToCarritoItem = (producto) => {

    const itemTitle = producto.titulo;
    const itemPrice = producto.precio;
    const itemImg = producto.imagen;
    const itemId = producto.id;

    const newItem = {
        titulo : itemTitle,
        precio : itemPrice,
        imagen : itemImg,
        cantidad : 1,
        id: itemId
    }

    addItemCarrito(newItem);
    
}

//registro los botones de agregar
clickButton.forEach(btn => {
    btn.addEventListener("click", addToCarritoItem)
})

//creo el espacio para la alerta
const alertaAgregado =  document.getElementById("alertaAgregado");
const divCard = document.createElement('div');

//agrego al carrito
const addItemCarrito = (newItem) =>{

    //creo la alerta que va en el espacio creado anteriormente
    const card = `<div class="alert alert-success container position-sticky mx-auto mt-3" role="alert">
    Cuando agregue el producto que aca aparezca la cantidad
     </div>`
     divCard.innerHTML = card;
    alertaAgregado.appendChild(divCard);

    setTimeout(() =>{
        alertaAgregado.classList.add('hide')
        
    },2000)
        alertaAgregado.classList.remove('hide')

    const inputElemento = tbody.getElementsByClassName('input__elemento')
   
    //reviso si ya tengo una unidad agregada y la sumo
    for(let i=0; i<carrito.length; i++){
        if(carrito[i].titulo.trim() == newItem.titulo.trim()){
            carrito[i].cantidad ++;
            const canti = carrito[i].cantidad;
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
        const precio = item.precio;
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

//actualizo el precio total
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

//convierto el carrito en string
function addLocalStorage(){
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

window.onload = function(){
    //vuelvo a parsear el carrito
    const storage = JSON.parse(localStorage.getItem('carrito'));
        if (storage){
            carrito = storage;
            renderCarrito();
        }
}


//evento del boton comprar
const btnComprar = document.getElementById('btnComprar');
btnComprar.addEventListener('click', ()=>{
    Swal.fire({
        title: 'Desea efectuar la compra?',
        text: "No se podra retroceder luego",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, estoy seguro!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Felicitaciones',
            'Su compra se ha efectuado con exito!',
            'success'
          )
        }
      })
});
