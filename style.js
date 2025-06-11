// Carrito simple
const carrito = {};
const carritoFlotante = document.getElementById('carrito-flotante');
const iconoCarrito = document.getElementById('icono-carrito');
const submenuCarrito = document.getElementById('submenu-carrito');
const carritoItems = document.getElementById('carrito-items');
const btnCancelar = document.getElementById('carrito-cancelar');
const btnComprar = document.getElementById('carrito-comprar');

// Mostrar/ocultar submenú
iconoCarrito.addEventListener('click', () => {
  submenuCarrito.classList.toggle('oculto');
});

// Cerrar submenú al hacer click fuera
document.addEventListener('click', (e) => {
  if (!carritoFlotante.contains(e.target) && !submenuCarrito.classList.contains('oculto')) {
    submenuCarrito.classList.add('oculto');
  }
});

// Agregar productos al carrito
document.querySelectorAll('.grid-item').forEach(item => {
  const btn = item.querySelector('.comprar');
  btn.addEventListener('click', () => {
    const img = item.querySelector('img').getAttribute('src');
    const desc = item.querySelector('.descripcion').textContent;
    const cantidad = parseInt(item.querySelector('.cantidad').value, 10);

    if (carrito[desc]) {
      carrito[desc].cantidad += cantidad;
    } else {
      carrito[desc] = { img, cantidad };
    }
    renderCarrito();
  });
});

// Renderizar carrito
function renderCarrito() {
  iconoCarrito.classList.add('animar');
  setTimeout(() => iconoCarrito.classList.remove('animar'), 400);
  carritoItems.innerHTML = '';
  const keys = Object.keys(carrito);
  if (keys.length === 0) {
    carritoItems.innerHTML = '<div style="text-align:center;color:#888;">El carrito está vacío</div>';
    return;
  }
  keys.forEach(desc => {
    const { img, cantidad } = carrito[desc];
    const div = document.createElement('div');
    div.className = 'carrito-item';
    div.innerHTML = `<img src="${img}" alt=""><span>${desc}</span> <span class="carrito-item-cantidad">x${cantidad}</span>`;
    carritoItems.appendChild(div);
    
  });
}

// Vaciar carrito
function vaciarCarrito() {
  for (let k in carrito) delete carrito[k];
  renderCarrito();
  submenuCarrito.classList.add('oculto');
}

btnCancelar.addEventListener('click', vaciarCarrito);
btnComprar.addEventListener('click', vaciarCarrito);

// Inicializar
renderCarrito();

// Esperamos a que cargue todo el DOM
document.addEventListener("DOMContentLoaded", function () {
  fetch("productos.json")
    .then(response => response.json())
    .then(productos => {
      const contenedor = document.getElementById("contenedor-productos");

      productos.forEach(producto => {
        const item = document.createElement("div");
        item.className = "grid-item";

        item.innerHTML = `
          <div class="contenedor-img">
            <img src="${producto.imagen}" alt="${producto.alt}" class="imagen-cuadricula">
          </div>
          <p class="descripcion">${producto.descripcion}</p>
          <div class="precio">$${producto.precio.toLocaleString()}</div>
          <div class="acciones">
            <input type="number" value="1" min="1" class="cantidad">
            <button class="comprar">Comprar</button>
          </div>
        `;

        contenedor.appendChild(item);

        // ✅ Asignar evento al botón de compra dentro del bucle
        const btn = item.querySelector('.comprar');
        btn.addEventListener('click', () => {
          const img = item.querySelector('img').getAttribute('src');
          const desc = item.querySelector('.descripcion').textContent;
          const cantidad = parseInt(item.querySelector('.cantidad').value, 10);

          if (carrito[desc]) {
            carrito[desc].cantidad += cantidad;
          } else {
            carrito[desc] = { img, cantidad };
          }

          renderCarrito();
        });
      });
    })
    .catch(error => {
      console.error("Error al cargar productos:", error);
    });

  fetch("PeterGriffing.json")
    .then(response => response.json())
    .then(jiji => {
      const contenedorjiji = document.getElementById("contenedor-promos");
      jiji.forEach(jajaja => {
        const adItem = document.createElement("div");
        adItem.className = "promo";
        adItem.innerHTML = `
          <a href="${jajaja.link}">
            <img src="${jajaja.imagen}" alt="Promocion vertical" class="promo promo-vertical">
          </a>
        `;
        contenedorjiji.appendChild(adItem);
      });
    })
    .catch(error => {
      console.error("Error al cargar publicidad:", error);
    });
});
