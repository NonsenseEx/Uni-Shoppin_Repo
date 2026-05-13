// 1. Catálogo Inicializado con 9 items
let catalog = [];
for (let i = 1; i <= 9; i++) {
    catalog.push({ 
        name: `Tech Item ${i}`, 
        desc: `Descripción del producto tecnológico número ${i}.`, 
        price: 10000 * i 
    });
}

const catalogWindow = document.getElementById('catalog-window');
const trackLeft = document.getElementById('track-left');
const trackRight = document.getElementById('track-right');

// Modales
const cartModal = document.getElementById('cart-modal');
const aboutModal = document.getElementById('about-modal');

// Botones Abrir
const btnOpenCart = document.getElementById('btn-open-cart');
const btnOpenAbout = document.getElementById('btn-open-about');

// Botones Cerrar
const btnCloseCart = document.getElementById('btn-close-cart');
const btnCloseAbout = document.getElementById('btn-close-about');
const btnCloseAboutBottom = document.getElementById('btn-close-about-bottom');

const productSelect = document.getElementById('cart-product-select');
const cartCountLabel = document.getElementById('cart-count');

let cart = [];

// RENDERIZADO
const renderCatalog = () => {
    catalogWindow.innerHTML = "";
    catalog.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `<h4>${item.name}</h4><p style="color:var(--color-10); font-weight:bold;">$${item.price.toLocaleString('es-CL')}</p>`;
        catalogWindow.appendChild(card);
    });
    updateCartDropdown();
};

const updateCartDropdown = () => {
    productSelect.innerHTML = "";
    catalog.forEach((p, index) => {
        const opt = document.createElement('option');
        opt.value = index;
        opt.textContent = p.name;
        productSelect.appendChild(opt);
    });
};

// EVENTOS MODAL SOBRE NOSOTROS
btnOpenAbout.addEventListener('click', (e) => {
    e.preventDefault();
    aboutModal.style.display = 'flex';
});

const closeAbout = () => { aboutModal.style.display = 'none'; };
btnCloseAbout.addEventListener('click', closeAbout);
btnCloseAboutBottom.addEventListener('click', closeAbout);

// EVENTOS CARRITO
btnOpenCart.addEventListener('click', (e) => {
    e.preventDefault();
    cartModal.style.display = 'flex';
});
btnCloseCart.addEventListener('click', () => { cartModal.style.display = 'none'; });

// PARALLAX CINTAS
window.addEventListener('scroll', () => {
    let scroll = window.scrollY;
    trackLeft.style.transform = `translateY(${-scroll * 0.1}px)`;
    trackRight.style.transform = `translateY(${-scroll * 0.15}px)`;
});

// FORMULARIO PRODUCTO
const btnShowForm = document.getElementById('btn-show-form');
const formContainer = document.getElementById('add-form-container');
const itemForm = document.getElementById('item-form');

btnShowForm.addEventListener('click', () => {
    formContainer.style.display = (formContainer.style.display === 'block') ? 'none' : 'block';
    if(formContainer.style.display === 'block') formContainer.scrollIntoView({ behavior: 'smooth' });
});

itemForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('item-name').value;
    const price = parseFloat(document.getElementById('item-price').value);
    const desc = document.getElementById('item-desc').value;

    catalog.push({ name, desc, price });
    renderCatalog();
    itemForm.reset();
    formContainer.style.display = 'none';
});

// Inicializar
renderCatalog();

// Botón Arriba
document.getElementById('btn-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});