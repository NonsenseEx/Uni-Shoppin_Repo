# Uni-Shoppin | Tech Store 🚀

**Uni-Shoppin** es una aplicación web funcional desarrollada para la gestión de productos tecnológicos y periféricos gamer. Este proyecto aplica conceptos avanzados de **JavaScript**, manipulación dinámica del **DOM** y buenas prácticas de seguridad para garantizar una experiencia de usuario robusta y protegida contra vulnerabilidades comunes como XSS.

## 🛠️ Tecnologías Utilizadas
* **HTML5:** Estructura semántica de la aplicación y formularios de captura.
* **CSS3:** Diseño responsivo con estética *Cyberpunk/Gamer*, efectos de neón y animaciones parallax.
* **JavaScript (ES6+):** Lógica de programación, gestión de arreglos de objetos, validaciones con RegEx y manipulación segura del DOM.

## ✨ Características Principales
* **Catálogo Dinámico:** Visualización de productos generada mediante `createElement` para evitar inyecciones de código.
* **Sistema CRUD:** Funcionalidad completa para agregar, editar y eliminar productos del inventario.
* **Carrito de Compras:** Cálculo automático de totales, gestión de cantidades y validación de stock simulada.
* **Validación de Formularios:** Reglas estrictas para campos como RUT chileno, teléfono y nombres (evitando números).

---

## 🤖 Uso de la IA (Informe de  Apoyo)

Siguiendo las directrices del proyecto, se utilizó Inteligencia Artificial para la validación, refactorización y mejora del código. A continuación, se detallan los hitos principales de este proceso:

### 1. Identidad de Marca y Contenido
* **Prompt:** *"Estoy diseñando una página web llamada Uni-Shoppin, dedicada a la venta de artículos electrónicos gamer y periféricos. Necesito una descripción de extensión mediana para la sección 'Sobre Nosotros' y un eslogan dinámico para colocar cerca del título."*
* **Mejora Aplicada:** Se definió la voz de la marca y se redactó el contenido textual que otorga personalidad al sitio.

### 2. Documentación Técnica y Arquitectura
* **Prompt:** *"Genera un archivo README.md para este proyecto. Debe incluir la descripción de la página, las tecnologías utilizadas (HTML, CSS, JavaScript), las características principales (catálogo, carrito, gestión de inventario) y un apartado sobre el uso de herramientas de Inteligencia Artificial en el desarrollo."*
* **Mejora Aplicada:** Se creó la documentación estructural del repositorio, detallando el funcionamiento lógico y técnico de la aplicación.

### 3. Estética Visual y Efectos Neón
* **Prompt:** *"Quiero aplicar un estilo de bordes de neón que haga contraste en la página. Usa una paleta de colores Cian y Magenta Eléctrico. Aplica este efecto a los marcos de las tarjetas de productos, la barra de navegación y los contenedores principales."*
* **Mejora Aplicada:** Se actualizó el archivo style.css con múltiples capas de box-shadow y bordes sólidos, logrando una estética Cyberpunk/Gamer inmersiva.

### 4. Funcionalidades CRUD y Paleta de Colores Operativa
* **Prompt:** *"Modifica el catálogo para que cada producto tenga botones de Editar y Borrar. Además, agrega un botón de Limpiar Carrito dentro del modal de compras. Asegúrate de que los botones de borrar y limpiar sean de color Magenta Eléctrico, y los de editar/confirmar usen el Cian de la página."*
* **Mejora Aplicada:** Se implementó la lógica de eliminación y edición de objetos en el arreglo catalog. Se vinculó la paleta de colores a la funcionalidad: Magenta para acciones destructivas y Cian para acciones de navegación o guardado.

### 5. Seguridad y Experiencia de Usuario (UX)
* **Prompt:** *"Refactoriza la función de renderizado del catálogo y del carrito para que sea segura contra ataques XSS, utilizando exclusivamente createElement y textContent en lugar de innerHTML. Finalmente, agrega un mensaje de alerta que diga 'Gracias por tus comentarios, se ha enviado una copia del formulario a su correo' cuando el usuario envíe el formulario de reclamos."*
* **Mejora Aplicada:** Se migró toda la manipulación dinámica del DOM a métodos nativos seguros, eliminando vulnerabilidades de inyección de código, y se añadió feedback interactivo al finalizar procesos en los formularios.

---

## 🚀 Instalación y Uso
1.  Clona este repositorio o descarga los archivos fuente.
2.  Asegúrate de tener la carpeta `img/` con las imágenes de los periféricos correspondientes.
3.  Abre el archivo `index.html` en cualquier navegador web moderno.

---
**Desarrollado por:** Tomás Andrés Aránguiz Fabres  
**Institución:** INACAP