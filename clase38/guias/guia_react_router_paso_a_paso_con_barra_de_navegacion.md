# Guía práctica: React Router (ruteo) con barra de navegación — paso a paso

> Archivo listo para descargar: contiene TODOS los comandos a ejecutar en la consola y los contenidos de archivo con **comentarios en línea** (explicaciones dentro del código). Pega los bloques exactamente en los archivos indicados.

---

## Prerrequisitos

```bash
# Verificar que tienes Node.js y npm instalados (recomendado Node 18+)
node -v
npm -v
```

Si no tienes Node, instala desde https://nodejs.org/ (elige LTS).

---

## 1) Crear el proyecto con Vite (comandos de consola)

```bash
# Crea un nuevo proyecto con Vite usando la plantilla React
npm create vite@latest my-react-router-app -- --template react

# Entra al directorio del proyecto
cd my-react-router-app

# Instala dependencias iniciales
npm install

# Instala react-router-dom (v6+)
npm install react-router-dom
```

> Nota: si prefieres yarn, sustituye `npm` por `yarn` o `pnpm` según tu preferencia.

---

## 2) Estructura de archivos que vamos a crear / modificar

Crea (o modifica) estos archivos dentro de `src/`:

```
src/
├─ main.jsx
├─ App.jsx
├─ index.css
├─ components/
│  └─ NavBar.jsx
└─ pages/
   ├─ Home.jsx
   ├─ Products.jsx
   └─ ProductDetails.jsx
```

---

## 3) Contenido de los archivos (pega tal cual). **Comentarios explicativos están dentro del código**.

### `src/main.jsx`

```jsx
// src/main.jsx
// Punto de entrada: crea el root y envuelve la app con BrowserRouter
import React from "react"; // import React (útil para claridad y compatibilidad)
import { createRoot } from "react-dom/client"; // createRoot para React 18+
import { BrowserRouter } from "react-router-dom"; // BrowserRouter habilita el ruteo por URL
import App from "./App"; // componente raíz
import "./index.css"; // estilos globales mínimos

// Obtiene el elemento <div id="root"></div> del index.html generado por Vite
const container = document.getElementById("root");
const root = createRoot(container); // crea el root de React

// Render: envuelve <App /> con <BrowserRouter> para que los hooks y componentes de react-router funcionen
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
```

---

### `src/App.jsx`

```jsx
// src/App.jsx
// Componente raíz: incluye la NavBar (siempre visible) y define las rutas con <Routes>
import React from "react";
import { Routes, Route } from "react-router-dom"; // Routes agrupa Route; Route define cada ruta
import NavBar from "./components/NavBar"; // barra de navegación
import Home from "./pages/Home"; // página de inicio
import Products from "./pages/Products"; // página con lista de productos
import ProductDetails from "./pages/ProductDetails"; // página de detalle (con :id)

export default function App() {
    return (
        <div>
            {/* NavBar se muestra en todas las rutas */}
            <NavBar />

            {/* Area principal donde se renderizan las vistas según la URL */}
            <main style={{ padding: 16 }}>
                <Routes>
                    {/* ruta exacta a / --> Home */}
                    <Route path="/" element={<Home />} />

                    {/* ruta para listado de productos */}
                    <Route path="/products" element={<Products />} />

                    {/* ruta con parámetro dinámico :id --> detalle de producto */}
                    <Route path="/products/:id" element={<ProductDetails />} />

                    {/* fallback para rutas no definidas */}
                    <Route
                        path="*"
                        element={<div>404 - Página no encontrada</div>}
                    />
                </Routes>
            </main>
        </div>
    );
}
```

---

### `src/components/NavBar.jsx`

```jsx
// src/components/NavBar.jsx
// Barra de navegación simple usando NavLink para detectar la ruta activa
import React from "react";
import { NavLink } from "react-router-dom"; // NavLink permite aplicar estilos cuando la ruta está activa

export default function NavBar() {
    // Estilo inline que aplicaremos al enlace activo
    const activeStyle = { fontWeight: "700", textDecoration: "underline" };

    return (
        // nav semántico con estilo mínimo
        <nav
            style={{
                borderBottom: "1px solid #ddd",
                padding: "8px 16px",
                display: "flex",
                gap: 12,
            }}
        >
            {/*
        NavLink acepta una función en style que recibe isActive.
        'end' evita que '/' coincida también con '/products'.
      */}
            <NavLink
                to="/"
                end
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
                Inicio
            </NavLink>

            <NavLink
                to="/products"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
                Productos
            </NavLink>

            {/* Ejemplo de enlace a una ruta que no definimos (demuestra 404 si lo presionan) */}
            <NavLink
                to="/about"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
                Acerca
            </NavLink>
        </nav>
    );
}
```

---

### `src/pages/Home.jsx`

```jsx
// src/pages/Home.jsx
// Página de inicio (componente de ruta simple)
import React from "react";

export default function Home() {
    return (
        <div>
            <h2>Inicio</h2>
            <p>
                Bienvenido. Usa la barra de navegación para cambiar entre rutas.
            </p>
        </div>
    );
}
```

---

### `src/pages/Products.jsx`

```jsx
// src/pages/Products.jsx
// Página que muestra una lista de productos y enlaces al detalle de cada uno
import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Link para navegación declarativa, useNavigate para programática

export default function Products() {
    const navigate = useNavigate(); // hook para navegar programáticamente

    // Datos de ejemplo en memoria (en una app real vendrían de una API)
    const products = [
        { id: "1", name: "Pan", price: 100 },
        { id: "2", name: "Leche", price: 80 },
        { id: "3", name: "Huevos", price: 60 },
    ];

    return (
        <div>
            <h2>Productos</h2>

            <ul>
                {products.map((p) => (
                    <li key={p.id} style={{ marginBottom: 8 }}>
                        {/* Link realiza navegación cliente sin recargar la página */}
                        <Link to={`/products/${p.id}`}>
                            {p.name} — ${p.price}
                        </Link>

                        {/* Botón que navega programáticamente al detalle */}
                        <button
                            onClick={() => navigate(`/products/${p.id}`)}
                            style={{ marginLeft: 8 }}
                        >
                            Ver
                        </button>
                    </li>
                ))}
            </ul>

            {/* Ejemplo de navegación programática a la home */}
            <button onClick={() => navigate("/")} style={{ marginTop: 12 }}>
                Volver al inicio
            </button>
        </div>
    );
}
```

---

### `src/pages/ProductDetails.jsx`

```jsx
// src/pages/ProductDetails.jsx
// Página de detalle de producto que lee el parámetro dinámico :id desde la URL
import React from "react";
import { useParams, useNavigate } from "react-router-dom"; // useParams lee parámetros, useNavigate para navegar

export default function ProductDetails() {
    const { id } = useParams(); // obtiene { id } desde la URL (/products/:id)
    const navigate = useNavigate(); // para navegar programáticamente

    // Datos en memoria (mismo dataset que Products.jsx)
    const products = [
        {
            id: "1",
            name: "Pan",
            price: 100,
            description: "Pan fresco del día.",
        },
        { id: "2", name: "Leche", price: 80, description: "Leche entera 1L." },
        {
            id: "3",
            name: "Huevos",
            price: 60,
            description: "Pack de 12 unidades.",
        },
    ];

    // Buscar el producto por id
    const product = products.find((p) => p.id === id);

    // Si no existe, mostramos mensaje y opción para volver a la lista
    if (!product) {
        return (
            <div>
                <h2>Producto no encontrado</h2>
                <button onClick={() => navigate("/products")}>
                    Ir a Productos
                </button>
            </div>
        );
    }

    // Si existe, mostramos detalles y botones de navegación
    return (
        <div>
            <h2>{product.name}</h2>
            <p>Precio: ${product.price}</p>
            <p>{product.description}</p>

            {/* navigate(-1) vuelve una página en el historial (comportamiento similar a "Atrás") */}
            <button onClick={() => navigate(-1)} style={{ marginRight: 8 }}>
                Volver
            </button>

            {/* Navegación absoluta a la lista de productos */}
            <button onClick={() => navigate("/products")}>
                Ver todos los productos
            </button>
        </div>
    );
}
```

---

### `src/index.css`

```css
/* src/index.css - estilos mínimos */
body {
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue",
        Arial;
    margin: 0; /* quitar margen por defecto */
    padding: 0;
}
input {
    padding: 6px 8px;
}
button {
    padding: 6px 8px;
    cursor: pointer;
}
nav a {
    margin-right: 12px;
    text-decoration: none;
    color: inherit;
}
```

---

## 4) Ejecutar la aplicación (consola)

```bash
# Inicia el servidor de desarrollo (Vite)
npm run dev

# Abre en el navegador la URL que indique Vite (por defecto http://localhost:5173)
```

---

## 5) Probar rutas y navegación (pasos rápidos)

1. En la barra de navegación haz clic en **Inicio** y verifica que `/` renderiza `Home`.
2. Haz clic en **Productos** y verifica que `/products` muestra la lista.
3. En la lista, haz clic en el enlace del producto o en "Ver" y comprueba que `/products/:id` muestra `ProductDetails`.
4. En `ProductDetails`, prueba los botones **Volver** y **Ver todos los productos**.
5. Escribe manualmente en la barra de URL `http://localhost:5173/unknown` para ver el `404 - Página no encontrada`.

---

## 6) Build para producción (opcional)

```bash
# Genera la build de producción
npm run build

# Previsualiza la build (Vite)
npm run preview
```

---

## Notas rápidas (sin explicar el código fuera de los bloques)

-   Este ejemplo usa rutas estáticas y parámetros dinámicos (`:id`) para demostrar la API básica de react-router-dom v6.
-   En una app real, los datos vendrían de una API y `ProductDetails` haría fetch usando el `id`.

---
