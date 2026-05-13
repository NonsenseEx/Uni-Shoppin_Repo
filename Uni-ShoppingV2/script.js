// Catálogo Inicial
// Reemplaza el ciclo for inicial por este arreglo manual
let catalog = [
    {
        name: "SteelSeries Apex Pro",
        desc: "Cuenta con interruptores magnéticos ajustables que permiten personalizar la distancia de actuación de cada tecla.",
        price: 45000,
        img: "img/Teclado 1.webp"
    },
    {
        name: "Logitech G502 X Plus",
        desc: "Incorpora interruptores híbridos óptico-mecánicos que ofrecen la velocidad de la luz con el click táctil tradicional.",
        price: 32000,
        img: "img/Mouse_1.webp"
    },
    {
        name: "Samsung Odyssey G9 OLED",
        desc: "Su panel curvo ultra ancho de 49 pulgadas proporciona una inmersión periférica total con negros perfectos.",
        price: 45000,
        img: "img/Monitor_1.webp"
    },
    {
        name: "Epson EcoTank L3250",
        desc: "Utiliza un sistema de depósitos de tinta recargables que reduce drásticamente el costo por página impresa.",
        price: 32000,
        img: "img/Impresora_1.webp"
    },
    {
        name: "HyperX Cloud Alpha Wireless",
        desc: "Famoso por su batería de hasta 300 horas y sistema de doble cámara para un audio nítido y profesional.",
        price: 45000,
        img: "img/Auriculares_JPG.webp"
    },
    {
        name: "Shure SM7B",
        desc: "Aislamiento electromagnético y voces cálidas que lo convierten en el favorito de los mejores streamers.",
        price: 32000,
        img: "img/Microfono_Jpg.webp"
    },
    {
        name: "Logitech C922 Pro Stream",
        desc: "Diseñada para transmisiones en vivo con una tasa de refresco rápida de 60 fps para evitar desenfoque.",
        price: 45000,
        img: "img/Webcam_jpg.webp"
    },
    {
        name: "Seagate FireCuda 530",
        desc: "SSD NVMe con velocidades de lectura de hasta 7.300 MB/s e incluye un disipador de calor avanzado.",
        price: 32000,
        img: "img/SSD_1.webp"
    },
    {
        name: "SanDisk Extreme Pro USB 3.2",
        desc: "Rendimiento de estado sólido en formato flash, ideal para transferir archivos pesados en segundos.",
        price: 45000,
        img: "img/Pendrive_1.webp"
    }
];

// Selectores
const catalogWindow = document.getElementById('catalog-window');
const cartModal = document.getElementById('cart-modal');
const aboutModal = document.getElementById('about-modal');
const feedbackModal = document.getElementById('feedback-modal');

// Abrir Modales
document.getElementById('btn-open-about').onclick = (e) => { e.preventDefault(); aboutModal.style.display = 'flex'; };
document.getElementById('btn-open-feedback').onclick = (e) => { e.preventDefault(); feedbackModal.style.display = 'flex'; };
document.getElementById('btn-open-cart').onclick = (e) => { e.preventDefault(); cartModal.style.display = 'flex'; };

// Cerrar Modales
document.querySelectorAll('.close-modal').forEach(btn => {
    btn.onclick = () => { cartModal.style.display = aboutModal.style.display = feedbackModal.style.display = 'none'; };
});

let cart = [];

const renderCatalog = () => {
    catalogWindow.innerHTML = "";
    catalog.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="card-img-box">
                <img src="${item.img}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: contain;">
            </div>
            <h4>${item.name}</h4>
            <p class="item-desc">${item.desc}</p>
            <div class="price">$${item.price.toLocaleString('es-CL')}</div>
        `;
        catalogWindow.appendChild(card);
    });
    updateCartDropdown();
};

const updateCartDropdown = () => {
    const ps = document.getElementById('cart-product-select');
    ps.innerHTML = "";
    catalog.forEach((p, idx) => {
        const opt = document.createElement('option');
        opt.value = idx;
        opt.textContent = `${p.name} ($${p.price.toLocaleString('es-CL')})`;
        ps.appendChild(opt);
    });
};

// Lógica Carrito (Cálculo y Lista)
document.getElementById('btn-add-to-cart').onclick = () => {
    const idx = document.getElementById('cart-product-select').value;
    const qty = parseInt(document.getElementById('cart-quantity').value);
    const prod = catalog[idx];
    if (prod && qty > 0) {
        const existing = cart.find(i => i.name === prod.name);
        if (existing) { existing.qty += qty; existing.subtotal = existing.qty * prod.price; }
        else { cart.push({ name: prod.name, qty, subtotal: prod.price * qty, price: prod.price }); }
        renderCartUI();
    }
};

const renderCartUI = () => {
    const list = document.getElementById('cart-items-list');
    list.innerHTML = "";
    let total = 0;
    cart.forEach(it => {
        const div = document.createElement('div');
        div.style.display = "flex"; div.style.justifyContent = "space-between"; div.style.padding = "5px 0";
        div.style.borderBottom = "1px solid rgba(255,255,255,0.05)";
        div.innerHTML = `<span>${it.name} x${it.qty}</span> <span>$${it.subtotal.toLocaleString('es-CL')}</span>`;
        list.appendChild(div);
        total += it.subtotal;
    });
    document.getElementById('cart-total-price').textContent = `$${total.toLocaleString('es-CL')}`;
    document.getElementById('cart-count').textContent = cart.length;
};

document.getElementById('btn-confirm-payment').onclick = () => {
    if (cart.length > 0) alert("Sera transferido a otra pagina para procesar su pago");
    else alert("Su carrito está vacío.");
};

// VALIDACIONES DE FORMULARIO (RECLAMOS)
document.getElementById('f-name').oninput = function() { this.value = this.value.replace(/[0-9]/g, ''); };
document.getElementById('rut-body').oninput = function() { this.value = this.value.replace(/[^0-9]/g, ''); };
document.getElementById('rut-dv').oninput = function() { this.value = this.value.toUpperCase().replace(/[^0-9K]/g, ''); };
document.getElementById('f-phone').oninput = function() { this.value = this.value.replace(/[^0-9]/g, ''); };

// PARALLAX Y SCROLL
window.onscroll = () => {
    const s = window.scrollY;
    document.getElementById('track-left').style.transform = `translateY(${-s * 0.1}px)`;
    document.getElementById('track-right').style.transform = `translateY(${-s * 0.15}px)`;
    document.getElementById('btn-top').style.display = s > 300 ? 'block' : 'none';
};

document.getElementById('btn-show-form').onclick = () => {
    const f = document.getElementById('add-form-container');
    f.style.display = 'block'; f.scrollIntoView({ behavior: 'smooth' });
};

document.getElementById('item-form').onsubmit = (e) => {
    e.preventDefault();
    catalog.push({
        name: document.getElementById('item-name').value,
        price: parseFloat(document.getElementById('item-price').value),
        desc: document.getElementById('item-desc').value
    });
    renderCatalog();
    document.getElementById('add-form-container').style.display = 'none';
};

renderCatalog();