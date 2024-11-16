// Función para filtrar productos basados en la búsqueda
function filtrarProductos() {
    const textoBusqueda = document.getElementById('buscar-producto').value.toLowerCase();
    const productos = document.querySelectorAll('#tienda > div');
    let productosEncontrados = false;

    productos.forEach(producto => {
        const nombreProducto = producto.querySelector('h3').textContent.toLowerCase();

        if (nombreProducto.includes(textoBusqueda)) {
            producto.style.display = 'block';
            productosEncontrados = true;
        } else {
            producto.style.display = 'none';
        }
    });

    const mensajeNoProductos = document.getElementById('no-result-message');
    if (!productosEncontrados) {
        mensajeNoProductos.style.display = 'block';
    } else {
        mensajeNoProductos.style.display = 'none';
    }
}
// Función para manejar la búsqueda
function buscarProducto(event) {
    event.preventDefault();
    filtrarProductos();
}

// Cambia la imagen del producto según el color seleccionado
function cambiarColor(productoId, color) {
    const imagenProducto = document.getElementById(`producto-img-${productoId}`);
    
    // Definir las rutas de imagen para cada color y producto
    const imagenes = {
        1: {
            gris: './assets/img/Nike Bailleli Gris.png',
            negro: './assets/img/Nike Bailleli Negro.png',
            verde: './assets/img/Nike Bailleli Verde.png'
        },
        2: {
            verde: './assets/img/Zapato adidas verde.png',
            azul: './assets/img/Zapato adidas azul.png',
            rojo: './assets/img/Zapato adidas rojo.png'
        },
        3: {
            rosado: './assets/img/Zapato puma rosado.png',
            beige: './assets/img/Zapato puma beige.png',
            morado: './assets/img/Zapato puma morado.png'
        },
        4: {
            celeste: './assets/img/Zapato air force celeste.png',
            marron: './assets/img/Zapato air force marron.png',
            negro: './assets/img/Zapato air force negro.png'
        },
        5: {
            negro: './assets/img/Zapato vans negro.png',
            azul: './assets/img/Zapato vans azul.png',
            naranja: './assets/img/Zapato vans naranja.png'
        },
        6: {
            naranja: './assets/img/Zapato puma hombre naranja.png',
            negro: './assets/img/Zapato puma hombre negro.png',
            azul: './assets/img/Zapato puma hombre azul.png'
        },
        7: {
            azul: './assets/img/Zapato niño azul.png',
            negro: './assets/img/Zapato niño negro.png',
            rojo: './assets/img/Zapato niño rojo.png'
        },
        8: {
            amarillo: './assets/img/Zapato niña amarillo.png',
            gris: './assets/img/Zapato niña gris.png',
            rosado: './assets/img/Zapato niña rosado.png'
        },
        9: {
            rojo: './assets/img/Nike niño rojo.png',
            azul: './assets/img/Nike niño azul.png',
            negro: './assets/img/Nike niño negro.png'
        }
    };

    // Verificar si existe una imagen para el color seleccionado y el producto
    if (imagenes[productoId] && imagenes[productoId][color]) {
        imagenProducto.src = imagenes[productoId][color];
    } else {
        console.error(`No se encontró imagen para el producto ${productoId} y color ${color}`);
    }
}

// Obtener los elementos
const iconoUsuario = document.getElementById('icono-usuario');
const ventanaUsuario = document.getElementById('ventana-usuario');
const cerrarVentana = document.getElementById('cerrar-ventana');

// Mostrar la ventana de usuario cuando se hace clic en el icono
iconoUsuario.addEventListener('click', function() {
    ventanaUsuario.style.display = 'flex';  // Muestra la ventana
});

// Cerrar la ventana cuando se hace clic en el botón de cerrar
cerrarVentana.addEventListener('click', function() {
    ventanaUsuario.style.display = 'none';  // Oculta la ventana
});

// Variable para almacenar los productos en el carrito
let carrito = {};

// Función para actualizar la cantidad de un producto
function actualizarCantidad(idProducto, cambio) {
    const cantidadInput = document.getElementById('cantidad-' + idProducto);
    let cantidadActual = parseInt(cantidadInput.value);

    // Asegurarse de que la cantidad no sea menor que 0
    if (cantidadActual + cambio >= 0) {
        cantidadInput.value = cantidadActual + cambio;
    }
}

// Función para agregar productos al carrito
function agregarAlCarrito(idProducto, nombreProducto, precio) {
    const cantidadProducto = parseInt(document.getElementById('cantidad-' + idProducto).value);

    if (cantidadProducto > 0) {
        // Si el producto ya está en el carrito, aumentar la cantidad
        if (carrito[idProducto]) {
            carrito[idProducto].cantidad += cantidadProducto;
        } else {
            // Si el producto no está en el carrito, agregarlo
            carrito[idProducto] = {
                id: idProducto,
                nombre: nombreProducto,
                precio: precio,
                cantidad: cantidadProducto,
            
            };
        }

        actualizarCarrito();
        actualizarContadorCarrito();
    } else {
        alert('Por favor, selecciona una cantidad mayor a 0.');
    }
}

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
    let contadorCarrito = 0;

    // Sumar las cantidades de todos los productos en el carrito
    for (let productoId in carrito) {
        contadorCarrito += carrito[productoId].cantidad;
    }

    // Actualizar el contador en la interfaz (suponiendo que tienes un contenedor con id "cantidad-total")
    document.getElementById('cantidad-total').textContent = contadorCarrito;
}

// Función para actualizar la ventana del carrito
function actualizarCarrito() {
    const carritoProductos = document.getElementById('carrito-productos');
    const totalCarrito = document.getElementById('total-carrito');
    carritoProductos.innerHTML = ''; // Limpia el contenido

    let total = 0;
    const productosEnCarrito = Object.values(carrito);

    if (productosEnCarrito.length === 0) {
        carritoProductos.innerHTML = '<p>Tu carrito está vacío</p>';
        totalCarrito.textContent = 'Total: $0.00';
        return;
    }

    productosEnCarrito.forEach(item => {
        const productoDiv = document.createElement('div');
        productoDiv.className = 'producto-carrito';
        productoDiv.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}" class="imagen-producto" style="width: 50px; height: 50px;">
            <div>
                <p>${item.nombre}</p>
                <p>Cantidad: ${item.cantidad}</p>
                <p>Precio unitario: $${item.precio.toFixed(2)}</p>
                <p>Subtotal: $${(item.precio * item.cantidad).toFixed(2)}</p>
            </div>
        `;
        carritoProductos.appendChild(productoDiv);
        total += item.precio * item.cantidad;
    });

    totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
}

// Mostrar ventana del carrito
document.getElementById('boton-carrito').addEventListener('click', function () {
    const ventanaCarrito = document.getElementById('ventana-carrito');
    ventanaCarrito.style.display = ventanaCarrito.style.display === 'none' ? 'block' : 'none';
});

// Vaciar el carrito
document.getElementById('vaciar-carrito').addEventListener('click', function () {
    carrito = {}; // Vacía el carrito
    actualizarCarrito();
    actualizarContadorCarrito();
});

// Cerrar ventana del carrito
document.getElementById('cerrar-carrito').addEventListener('click', function () {
    document.getElementById('ventana-carrito').style.display = 'none';
});

    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Detecta el cambio en el estado del checkbox (si está marcado o desmarcado)
    menuToggle.addEventListener('change', function() {
        if (menuToggle.checked) {
            navLinks.style.display = 'flex';  // Muestra el menú
        } else {
            navLinks.style.display = 'none';  // Oculta el menú
        }
    });


