# 📘 Guía Completa: Aprender Bootstrap Desde Cero

Bootstrap es un framework CSS de código abierto que facilita el diseño web responsive y moderno. Esta guía te llevará paso a paso desde lo más básico hasta lo esencial para usar Bootstrap en tus proyectos.

---

## 📌 1. ¿Qué es Bootstrap?

Bootstrap es una biblioteca de herramientas front-end que incluye:

-   Sistema de **grid (rejilla)** para layouts.
-   **Componentes UI** (botones, tarjetas, menús, etc).
-   Estilos prediseñados y responsivos.
-   **JavaScript interactivo** con componentes como modals, sliders, alerts, etc.

---

## 🔧 2. Cómo Empezar

### Opción A: Usar Bootstrap vía CDN (más simple)

Agrega este código dentro del `<head>` de tu archivo HTML:

```html
<link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    rel="stylesheet"
/>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
```

### Opción B: Instalación con NPM (para proyectos más avanzados)

```bash
npm install bootstrap
```

Y luego en tu JS/CSS:

```js
// En tu JavaScript
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
```

---

## 🧱 3. Sistema de Grid (Rejilla)

Bootstrap utiliza un sistema de **grid de 12 columnas** basado en Flexbox. Este sistema permite crear layouts responsivos que se adaptan automáticamente al tamaño del dispositivo.

### 📐 Conceptos básicos

-   Todo layout debe estar dentro de un **contenedor** (`.container` o `.container-fluid`).
-   Luego se define una **fila** (`.row`).
-   Dentro de la fila, se agregan **columnas** (`.col`), que sumadas deben dar un máximo de 12 por fila.

```html
<div class="container">
    <div class="row">
        <div class="col-6">50%</div>
        <div class="col-6">50%</div>
    </div>
</div>
```

---

### 📱 Diseño Responsive

Bootstrap define **breakpoints** para adaptar el diseño según el tamaño de pantalla:

| Clase      | Dispositivo       | Ancho mínimo |
| ---------- | ----------------- | ------------ |
| `col-`     | Extra pequeño     | 0 px         |
| `col-sm-`  | Pequeño (phones)  | 576 px       |
| `col-md-`  | Mediano (tablets) | 768 px       |
| `col-lg-`  | Grande (desktops) | 992 px       |
| `col-xl-`  | Extra grande      | 1200 px      |
| `col-xxl-` | XXL               | 1400 px      |

#### Ejemplo adaptativo:

```html
<div class="row">
    <div class="col-12 col-md-6 col-lg-4">Columna adaptable</div>
    <div class="col-12 col-md-6 col-lg-4">Columna adaptable</div>
    <div class="col-12 col-md-12 col-lg-4">Columna adaptable</div>
</div>
```

Este código hará que:

-   En móviles (`<768px`), las 3 columnas ocupen todo el ancho (una debajo de otra).
-   En tablets (`≥768px`), se dividan en dos columnas + una debajo.
-   En desktop (`≥992px`), se repartan en tres columnas iguales.

---

### 📏 Autoajuste y sin valores

Cuando se usa `.col` sin número, las columnas se reparten equitativamente.

```html
<div class="row">
    <div class="col">Auto</div>
    <div class="col">Auto</div>
    <div class="col">Auto</div>
</div>
```

---

### 🔄 Anidación de columnas

Puedes colocar filas dentro de columnas:

```html
<div class="row">
    <div class="col-6">
        <div class="row">
            <div class="col-6">Col interna 1</div>
            <div class="col-6">Col interna 2</div>
        </div>
    </div>
    <div class="col-6">Col exterior</div>
</div>
```

---

### 🔧 Clases auxiliares para layout

-   `g-3` → Espaciado (gutters) entre columnas.
-   `row-cols-2`, `row-cols-md-3` → Cantidad automática de columnas por fila.
-   `offset-` → Desplazamiento de columnas (espacio en blanco).
-   `order-` → Reordenar columnas.

```html
<div class="row">
    <div class="col-4 offset-4">Centrada</div>
</div>
```

---

## 🎨 4. Clases de Utilidad

### Espaciado (margen/padding)

-   `m-3`, `mt-2`, `mb-4`, `p-1`, etc.
    -   `m` = margin, `p` = padding
    -   `t`, `b`, `l`, `r`, `x`, `y` = top, bottom, left, right, eje X/Y

### Colores

```html
<p class="text-primary bg-light">Texto azul con fondo claro</p>
```

### Alineación

```html
<div class="text-center">Centrado</div>
<div class="d-flex justify-content-end">Derecha con Flex</div>
```

---

## 🧩 5. Componentes Básicos

### Botones

```html
<button class="btn btn-primary">Botón Azul</button>
<button class="btn btn-outline-success">Botón Borde Verde</button>
```

### Navbar (barra de navegación)

```html
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Mi Sitio</a>
    <button
        class="navbar-toggler"
        data-bs-toggle="collapse"
        data-bs-target="#menu"
    >
        ☰
    </button>
    <div class="collapse navbar-collapse" id="menu">
        <ul class="navbar-nav ms-auto">
            <li class="nav-item"><a class="nav-link" href="#">Inicio</a></li>
            <li class="nav-item"><a class="nav-link" href="#">Servicios</a></li>
        </ul>
    </div>
</nav>
```

### Tarjetas (Cards)

```html
<div class="card" style="width: 18rem;">
    <img src="img.jpg" class="card-img-top" alt="..." />
    <div class="card-body">
        <h5 class="card-title">Título</h5>
        <p class="card-text">Descripción breve.</p>
        <a href="#" class="btn btn-primary">Ver más</a>
    </div>
</div>
```

---

## 📦 6. Formularios

Bootstrap aplica estilo automáticamente a formularios:

```html
<form>
    <div class="mb-3">
        <label class="form-label">Correo</label>
        <input type="email" class="form-control" />
    </div>
    <button type="submit" class="btn btn-primary">Enviar</button>
</form>
```

---

## 🌀 7. Componentes Interactivos (requieren JavaScript)

### Alertas

```html
<div class="alert alert-success">¡Operación exitosa!</div>
```

### Modal

```html
<!-- Botón para abrir -->
<button
    class="btn btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#miModal"
>
    Abrir Modal
</button>

<!-- Modal -->
<div class="modal fade" id="miModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Título del Modal</h5>
                <button class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">Contenido del modal aquí.</div>
        </div>
    </div>
</div>
```

---

## 🧰 8. Herramientas Útiles

-   [Bootstrap Studio](https://bootstrapstudio.io) – Editor visual.
-   [LayoutIt!](https://www.layoutit.com) – Constructor online de grids.
-   [Bootstrap Icons](https://icons.getbootstrap.com) – Íconos oficiales.

---

## 📎 9. Buenas Prácticas

-   Usa clases Bootstrap en lugar de escribir CSS desde cero cuando sea posible.
-   Apóyate en las clases responsive (`d-none d-md-block`, etc).
-   Revisa la [documentación oficial](https://getbootstrap.com) para ver todas las posibilidades.

---

## 📚 Recursos

-   📘 [Documentación oficial de Bootstrap](https://getbootstrap.com)
