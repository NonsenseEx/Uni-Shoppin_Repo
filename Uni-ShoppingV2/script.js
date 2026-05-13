let catalog = [
    { name: "SteelSeries Apex Pro", desc: "Interruptores magnéticos ajustables para personalización total.", price: 45000, img: "img/Teclado 1.webp" },
    { name: "Logitech G502 X Plus", desc: "Interruptores híbridos óptico-mecánicos de alta velocidad.", price: 32000, img: "img/Mouse_1.webp" },
    { name: "Samsung Odyssey G9 OLED", desc: "Panel curvo de 49 pulgadas para inmersión periférica total.", price: 150000, img: "img/Monitor_1.webp" },
    { name: "Epson EcoTank L3250", desc: "Sistema de depósitos de tinta recargables de bajo costo.", price: 120000, img: "img/Impresora_1.webp" },
    { name: "HyperX Cloud Alpha Wireless", desc: "Batería de 300 horas y audio nítido de doble cámara.", price: 85000, img: "img/Auriculares_JPG.webp" },
    { name: "Shure SM7B", desc: "Captura voces cálidas con aislamiento electromagnético.", price: 350000, img: "img/Microfono_Jpg.webp" },
    { name: "Logitech C922 Pro Stream", desc: "Transmisiones fluidas a 60 fps específicamente para streaming.", price: 65000, img: "img/Webcam_jpg.webp" },
    { name: "Seagate FireCuda 530", desc: "SSD NVMe extremo con velocidades de hasta 7.300 MB/s.", price: 110000, img: "img/SSD_1.webp" },
    { name: "SanDisk Extreme Pro USB", desc: "Rendimiento de estado sólido en formato flash compacto.", price: 25000, img: "img/Pendrive_1.webp" }
];

let cart = [];

/** * GESTIÓN DEL DOM (REQUISITO INACAP: CREATEELEMENT / TEXTCONTENT)
 */
const renderCatalog = () => {
    const catalogWindow = document.getElementById('catalog-window');
    catalogWindow.innerHTML = ""; 

    catalog.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';

        // Imagen
        const imgBox = document.createElement('div');
        imgBox.className = 'card-img-box';
        const img = document.createElement('img');
        img.src = item.img || 'https://via.placeholder.com/150';
        imgBox.appendChild(img);

        // Título
        const title = document.createElement('h4');
        title.textContent = item.name;

        // Descripción
        const desc = document.createElement('p');
        desc.className = 'item-desc';
        desc.textContent = item.desc;

        // Precio
        const price = document.createElement('div');
        price.className = 'price';
        price.textContent = `$${item.price.toLocaleString('es-CL')}`;

        // Acciones CRUD
        const actions = document.createElement('div');
        actions.className = 'card-actions';

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Editar';
        editBtn.className = 'btn-edit';
        editBtn.onclick = () => prepareEdit(index);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Borrar';
        deleteBtn.className = 'btn-delete';
        deleteBtn.onclick = () => deleteItem(index);

        actions.append(editBtn, deleteBtn);
        card.append(imgBox, title, desc, price, actions);
        catalogWindow.appendChild(card);
    });
    updateCartDropdown();
};

const deleteItem = (index) => {
    if (confirm(`¿Eliminar ${catalog[index].name}?`)) {
        catalog.splice(index, 1);
        renderCatalog();
    }
};

const prepareEdit = (index) => {
    const item = catalog[index];
    document.getElementById('item-name').value = item.name;
    document.getElementById('item-price').value = item.price;
    document.getElementById('item-desc').value = item.desc;
    document.getElementById('edit-index').value = index;
    document.getElementById('form-title').textContent = "Editar Producto";
    document.getElementById('add-form-container').style.display = 'block';
    document.getElementById('add-form-container').scrollIntoView({ behavior: 'smooth' });
};

document.getElementById('item-form').onsubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById('item-name').value;
    const price = parseFloat(document.getElementById('item-price').value);
    const desc = document.getElementById('item-desc').value;
    const editIdx = parseInt(document.getElementById('edit-index').value);

    if (editIdx > -1) {
        catalog[editIdx] = { ...catalog[editIdx], name, price, desc };
    } else {
        catalog.push({ name, price, desc, img: "" });
    }

    renderCatalog();
    e.target.reset();
    document.getElementById('edit-index').value = "-1";
    document.getElementById('form-title').textContent = "Añadir Nuevo Producto";
    document.getElementById('add-form-container').style.display = 'none';
};

const updateCartDropdown = () => {
    const select = document.getElementById('cart-product-select');
    select.innerHTML = "";
    catalog.forEach((p, i) => {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = `${p.name} ($${p.price.toLocaleString('es-CL')})`;
        select.appendChild(opt);
    });
};

/** * CARRITO SEGURO (SIN INNERHTML)
 */
document.getElementById('btn-add-to-cart').onclick = () => {
    const idx = document.getElementById('cart-product-select').value;
    const qty = parseInt(document.getElementById('cart-quantity').value);
    const prod = catalog[idx];

    if (prod && qty > 0) {
        const existing = cart.find(i => i.name === prod.name);
        if (existing) {
            existing.qty += qty;
            existing.subtotal = existing.qty * prod.price;
        } else {
            cart.push({ name: prod.name, qty, subtotal: prod.price * qty, price: prod.price });
        }
        renderCartUI();
    }
};

document.getElementById('btn-clear-cart').onclick = () => {
    if (cart.length > 0 && confirm("¿Deseas vaciar el carrito?")) {
        cart = [];
        renderCartUI();
    }
};

const renderCartUI = () => {
    const list = document.getElementById('cart-items-list');
    list.innerHTML = ""; // Limpieza controlada
    let total = 0;
    
    cart.forEach(it => {
        const row = document.createElement('div');
        row.style.display = "flex"; 
        row.style.justifyContent = "space-between"; 
        row.style.padding = "5px 0";

        const itemLabel = document.createElement('span');
        itemLabel.textContent = `${it.name} x${it.qty}`;

        const itemSubtotal = document.createElement('span');
        itemSubtotal.textContent = `$${it.subtotal.toLocaleString('es-CL')}`;

        row.append(itemLabel, itemSubtotal);
        list.appendChild(row);
        total += it.subtotal;
    });
    document.getElementById('cart-total-price').textContent = `$${total.toLocaleString('es-CL')}`;
    document.getElementById('cart-count').textContent = cart.length;
};

document.getElementById('btn-confirm-payment').onclick = () => {
    if (cart.length > 0) alert("Sera transferido a otra pagina para procesar su pago");
};

/** * RECLAMOS
 */
document.getElementById('user-feedback-form').onsubmit = (e) => {
    e.preventDefault();
    alert("Gracias por tus comentarios, se ha enviado una copia del formulario su correo");
    e.target.reset();
    document.getElementById('feedback-modal').style.display = 'none';
};

const setupModals = () => {
    document.getElementById('btn-open-about').onclick = (e) => { e.preventDefault(); document.getElementById('about-modal').style.display = 'flex'; };
    document.getElementById('btn-open-feedback').onclick = (e) => { e.preventDefault(); document.getElementById('feedback-modal').style.display = 'flex'; };
    document.getElementById('btn-open-cart').onclick = (e) => { e.preventDefault(); document.getElementById('cart-modal').style.display = 'flex'; };

    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.onclick = () => { document.getElementById(btn.dataset.modal).style.display = 'none'; };
    });
};

// Validaciones Robustas
document.getElementById('f-name').oninput = function() { this.value = this.value.replace(/[0-9]/g, ''); };
document.getElementById('f-phone').oninput = function() { this.value = this.value.replace(/[^0-9]/g, ''); };
document.getElementById('rut-body').oninput = function() { this.value = this.value.replace(/[^0-9]/g, ''); };
document.getElementById('rut-dv').oninput = function() { this.value = this.value.toUpperCase().replace(/[^0-9K]/g, ''); };

window.onscroll = () => {
    const s = window.scrollY;
    document.getElementById('track-left').style.transform = `translateY(${-s * 0.1}px)`;
    document.getElementById('track-right').style.transform = `translateY(${-s * 0.15}px)`;
    document.getElementById('btn-top').style.display = s > 300 ? 'block' : 'none';
};

document.getElementById('btn-show-form').onclick = () => {
    document.getElementById('add-form-container').style.display = 'block';
    document.getElementById('add-form-container').scrollIntoView({ behavior: 'smooth' });
};

document.getElementById('btn-cancel-form').onclick = () => {
    document.getElementById('add-form-container').style.display = 'none';
    document.getElementById('item-form').reset();
    document.getElementById('edit-index').value = "-1";
};

// Inicialización
renderCatalog();
setupModals();