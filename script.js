// Código creado por Fernando Bruno - Comisión 52235

// DECLARACIÓN DE ARRAYS 
// array con mi lista de productos en la página
let discos = [
    { id: 1, disco: "Revolver", artista: "The Beatles", genero: "Rock", stock: 5, precio: 20000 },

    { id: 2, disco: "Low", artista: "David Bowie", genero: "Rock", stock: 8, precio: 12000 },

    { id: 3, disco: "Discovery", artista: "Daft Punk", genero: "Electronica", stock: 3, precio: 20000 },

    { id: 4, disco: "In Rainbows", artista: "Radiohead", genero: "Rock", stock: 4, precio: 13000 },

    { id: 5, disco: "Cross", artista: "Justice", genero: "Electronica", stock: 1, precio: 15000 },

    { id: 6, disco: "Mezzanine", artista: "Massive Attack", genero: "Electronica", stock: 6, precio: 22000 }

]
// array para el carrito de compra
let carrito = []

// DECLARACIÓN DE FUNCIONES


// funcion para mostrar la lista de discos (ya sea filtrado o no) de manera ordenada
function mostrarLista(listaFinal) {
    let listado = ""
    listaFinal.forEach(elemento => {
        listado = listado + "Número " + elemento.id + " - " + elemento.disco + " - " + elemento.artista + "\n" + elemento.genero + "\n" + elemento.stock + " unidades - " + "$" + elemento.precio + "\n\n"
    })
    return listado
}

// función para mostrar en forma de lista mi carrito
function mostrarCarrito(carritoFinal) {
    let listaCarrito = ""
    carritoFinal.forEach(producto => {
        listaCarrito = listaCarrito + producto.disco + " - " + producto.artista + "\n" + "Cantidad: " + producto.unidades + " - " + "$" + producto.precio + "\n" + "Subtotal: $" + producto.subtotal + "\n\n"
    })
    return listaCarrito
}


// funcion para crear una copia de mi lista original, ordenarla de menor a mayor o viceversa segun el precio y devolver ese resultado
function verPrecios(ordenPrecio) {
    let preciosOrdenados = discos.slice() // creo una copia para no modificar mi array original
    while (ordenPrecio !== 1 && ordenPrecio !== 2) { // si el usuario no pone ni 1 ni 2, que permita su reingreso
        ordenPrecio = Number(prompt("Error, por favor escriba 1 para ordenar los precios de menor a mayor o 2 para ordenar de mayor a menor"))
    }
    if (ordenPrecio === 1) {
        preciosOrdenados.sort((a, b) => a.precio - b.precio) // ordeno de menor a mayor
    } else {
        preciosOrdenados.sort((a, b) => b.precio - a.precio) // ordeno de mayor a menor
    }
    return preciosOrdenados
}

// funcion para llenar y actualizar mi carrito de compra, chequeo también si el producto ya está en el carrito o no
function actualizarCarrito(productoEncontrado, posicion) {
    if (posicion === -1) { // si es la primera vez que agrega el producto al carrito
        carrito.push({
            id: productoEncontrado.id,
            disco: productoEncontrado.disco,
            artista: productoEncontrado.artista,
            genero: productoEncontrado.genero,
            precio: productoEncontrado.precio,
            unidades: 1,
            subtotal: productoEncontrado.precio
        })
    } else { // si ya ingresó el producto al carrito
        let stockActual = productoEncontrado.stock
        if (stockActual > carrito[posicion].unidades) { // chequeo de que haya stock disponible antes de agregar otra unidad al carrito
            carrito[posicion].unidades++
            carrito[posicion].subtotal = carrito[posicion].precio * carrito[posicion].unidades
        } else {
            alert("No tenemos más stock disponible para agregar al carrito")
        }

    }

}
// funcion para buscar el id del producto, chequear de que sea el id correcto, ver si ya está en el carrito y enviarlo a la función actualizarCarrito
function comprar() {
    let id = Number(prompt("Seleccione el número del producto a comprar: \n" + mostrarLista(discos)))
    let productoBuscado = discos.find(prod => prod.id === id)
    while (productoBuscado === undefined) {// en caso de que el usuario no coloque la id correcta
        id = Number(prompt("Error, por favor, Seleccione correctamente el número del producto a comprar: \n" + mostrarLista(discos)))
        productoBuscado = discos.find(prod => prod.id === id)
    }
    let posicionProductoEnCarrito = carrito.findIndex(prod => prod.id === productoBuscado.id)
    actualizarCarrito(productoBuscado, posicionProductoEnCarrito)
}

// DECLARACION DE VARIABLES GLOBALES

let mensajeBienvenida = "Bienvenido a nuestra disquería! Elija las siguientes opciones ingresando el número\n1 - Ver lista completa\n2 - Filtrar por género musical\n3 - Ver la lista con los precios de menor a mayor o de mayor a menor\n4 - Agregar producto al carrito\n5 - Ver carrito de compra\n6 - Ver el total a pagar\n0 - Salir de la página"

let opcion

let verLista

// INICIO DEL BLOQUE PRINCIPAL

do {
    opcion = Number(prompt(mensajeBienvenida))
    switch (opcion) {
        case 1:// mostrar la lista completa original de productos que tengo en mi página
            alert(mostrarLista(discos))
            break
        case 2:// filtrar mi lista en base a género musical
            let eleccion = prompt("Por favor, escribir 'Rock' o 'Electronica' para filtrar la búsqueda")
            if (eleccion === "Rock" || eleccion === "Electronica") { //valido de que el usuario haya ingresado correctamente el genero
                let discosFiltrados = discos.filter((disco) => disco.genero === eleccion)
                alert(mostrarLista(discosFiltrados)) //llamada a función
            } else {
                alert("Error, por favor escriba correctamente 'Rock' o 'Electronica', próximamente estarán ingresando más discos de otros géneros!")
            }
            break
        case 3:
            // le digo al usuario que ingrese la opción 1 o 2
            let orden = Number(prompt("Escriba 1 para ver los precios de menor a mayor\nEscriba 2 para ver los productos de mayor a menor"))
            let precios = verPrecios(orden) // envio la opción a la función y ahí se encargará de validar el dato y devolver la lista ordenada
            alert(mostrarLista(precios))
            break
        case 4:
            // voy a la funcion comprar () que se encarga de todo el proceso de validación y búsqueda 
            comprar() //llamada a función
            break
        case 5:
            // veo el carrito de compra que tengo en el momento
            if (carrito.length > 0) { //chequeo de que el carrito ya tenga algún producto encima
                alert(mostrarCarrito(carrito)) //llamada a función
            } else {
                alert("El carrito está vacio")
            }
            break
        case 6:
            // muestro el precio total a pagar en el momento
            let precioFinal = 0
            precioFinal = carrito.reduce((total, disco) => total + disco.subtotal, 0)
            alert("El precio total a pagar es de: $" + precioFinal)
            break
        case 0:
            // mensaje de despedida
            alert("Gracias por visitar nuestra página, nos vemos!")
            break
        default: // si el usuario elije cualquier opcion menos las correctas
            alert("Error, por favor elija una opción correcta")
            break
    }

} while (opcion !== 0)


