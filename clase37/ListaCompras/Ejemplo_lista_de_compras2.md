# Archivos — Lista de compras con cantidades (comentarios **solo** inline)

> Los siguientes archivos contienen el código con comentarios **únicamente dentro del código** (es decir, explicaciones línea por línea en forma de comentarios). No hay explicaciones fuera de los bloques de código.

---

## `src/main.jsx`

```jsx
// main.jsx
// Punto de entrada de la app: crea el root de React y monta <App />.
import React from "react"; // Importa React (necesario para JSX en algunas configuraciones)
import { createRoot } from "react-dom/client"; // Importa createRoot para React 18+
import App from "./App"; // Importa el componente raíz de la aplicación
import "./index.css"; // Importa estilos globales mínimos

// Obtiene el elemento del DOM donde React montará la app
const container = document.getElementById("root"); // query al DOM por el id 'root'
const root = createRoot(container); // crea el root de React usando el contenedor
root.render(<App />); // renderiza el componente <App /> dentro del root
```

---

## `src/App.jsx`

```jsx
// App.jsx
// Componente raíz que solo monta la pieza principal: ListaComprasCantidades
import React from "react"; // importa React
import ListaComprasCantidades from "./components/ListaComprasCantidades"; // importa el componente principal

export default function App() {
    // exporta el componente App por defecto
    return (
        <div style={{ padding: 24 }}>
            {/* Renderiza el componente principal de la demo */}
            <ListaComprasCantidades />
        </div>
    );
}
```

---

## `src/components/ProductForm.jsx`

```jsx
// ProductForm.jsx
// Formulario controlado que recibe `onAdd` por props y envía { nombre, cantidad }
import React, { useState } from "react"; // importa React y useState

export default function ProductForm({ onAdd }) {
    // componente que recibe onAdd como prop
    const [nombre, setNombre] = useState(""); // estado para el campo nombre (string)
    const [cantidad, setCantidad] = useState("1"); // estado para la cantidad (string para el input)

    // handleAdd valida y transforma los valores antes de llamar a onAdd
    function handleAdd() {
        const n = nombre.trim(); // elimina espacios al inicio/fin
        const c = parseInt(cantidad, 10); // convierte la cantidad a número entero base 10
        if (!n) return; // si no hay nombre válido, no hace nada
        if (Number.isNaN(c) || c < 1) return; // cantidad mínima 1, si inválida no hace nada

        // llama al callback del padre pasándole el objeto con nombre y cantidad
        onAdd({ nombre: n, cantidad: c });

        // limpia los inputs tras agregar
        setNombre("");
        setCantidad("1");
    }

    // Render del formulario: inputs controlados y botón
    return (
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            {/* Input para el nombre del producto: value viene del estado `nombre` */}
            <input
                placeholder="Producto"
                value={nombre} // value controlado por el estado
                onChange={(e) => setNombre(e.target.value)} // actualiza el estado al escribir
            />

            {/* Input para la cantidad inicial: value es string para controlar el input */}
            <input
                type="number"
                placeholder="Cantidad"
                value={cantidad} // value controlado por el estado
                onChange={(e) => setCantidad(e.target.value)} // actualiza la cantidad (string)
                style={{ width: 80 }}
            />

            {/* Botón que ejecuta handleAdd al click */}
            <button onClick={handleAdd}>Agregar</button>
        </div>
    );
}
```

---

## `src/components/ProductoRow.jsx`

```jsx
// ProductoRow.jsx
// Componente de presentación de una fila de producto con botones para +/- y eliminar
import React from "react"; // importa React

// Recibe por props: product (obj), onIncrement(id), onDecrement(id), onDelete(id)
export default function ProductoRow({
    product,
    onIncrement,
    onDecrement,
    onDelete,
}) {
    return (
        <li
            style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 8,
            }}
        >
            <div style={{ flex: 1 }}>{product.nombre}</div>{" "}
            {/* muestra el nombre */}
            <button onClick={() => onDecrement(product.id)}>-</button> {/* decrementa llamando al padre con id */}
            <div style={{ minWidth: 28, textAlign: "center" }}>
                {product.cantidad}
            </div>{" "}
            {/* muestra cantidad */}
            <button onClick={() => onIncrement(product.id)}>+</button> {/* incrementa llamando al padre con id */}
            <button
                onClick={() => onDelete(product.id)}
                style={{ marginLeft: 8 }}
            >
                Eliminar
            </button>{" "}
            {/* elimina por id */}
        </li>
    );
}
```

---

## `src/components/ListaComprasCantidades.jsx`

```jsx
// ListaComprasCantidades.jsx
// Componente padre que mantiene el estado de los productos y pasa callbacks a los hijos
import React, { useState } from "react"; // importa React y useState
import ProductoRow from "./ProductoRow"; // componente fila
import ProductForm from "./ProductForm"; // componente formulario

export default function ListaComprasCantidades() {
    // estado inicial: array de objetos con id único, nombre y cantidad
    const [productos, setProductos] = useState([
        { id: 1, nombre: "Pan", cantidad: 2 },
        { id: 2, nombre: "Leche", cantidad: 1 },
    ]);

    // funcion generadora simple de ids (para demo). En producción usar UUID o DB id.
    function generarId() {
        return Date.now() + Math.floor(Math.random() * 1000); // combina timestamp + aleatorio
    }

    // onAdd: agrega un nuevo producto al estado (recibe { nombre, cantidad } desde ProductForm)
    function onAdd({ nombre, cantidad }) {
        const nuevo = { id: generarId(), nombre, cantidad }; // crea el objeto nuevo
        setProductos((prev) => [...prev, nuevo]); // agrega de forma inmutable al final
    }

    // onIncrement: incrementa la cantidad del producto con el id indicado
    function onIncrement(id) {
        setProductos((prev) =>
            prev.map((p) =>
                p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p
            )
        );
    }

    // onDecrement: decrementa la cantidad sin bajar de 0
    function onDecrement(id) {
        setProductos((prev) =>
            prev.map((p) =>
                p.id === id
                    ? { ...p, cantidad: Math.max(0, p.cantidad - 1) }
                    : p
            )
        );
    }

    // onDelete: elimina el producto filtrando por id
    function onDelete(id) {
        setProductos((prev) => prev.filter((p) => p.id !== id));
    }

    // totalItems: suma de todas las cantidades (derivada del estado)
    const totalItems = productos.reduce((s, p) => s + p.cantidad, 0);

    // Render: Formulario + lista de ProductoRow + resumen
    return (
        <div style={{ padding: 16, border: "1px solid #ddd", maxWidth: 520 }}>
            <h3>Lista de compras (componentizada)</h3>
            {/* ProductForm pasará los datos al padre mediante la prop onAdd */}
            <ProductForm onAdd={onAdd} />
            <ul style={{ paddingLeft: 0, listStyle: "none" }}>
                {productos.map((p) => (
                    <ProductoRow
                        key={p.id} // key estable basada en id
                        product={p} // pasa el objeto product completo
                        onIncrement={onIncrement} // callback para incrementar
                        onDecrement={onDecrement} // callback para decrementar
                        onDelete={onDelete} // callback para eliminar
                    />
                ))}
            </ul>
            <div style={{ marginTop: 12 }}>
                <strong>Total de ítems:</strong> {totalItems}{" "}
                {/* muestra el total calculado */}
            </div>
            {productos.length === 0 && (
                <div style={{ marginTop: 8 }}>No hay productos</div>
            )} {/* mensaje si está vacío */}
        </div>
    );
}
```

---

## `src/index.css`

```css
/** el estilado general se realiza utilizando picoCSS */
body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
```

## `src/index.html`

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <link rel="stylesheet" href="./src/pico.min.css" />
        <!-- descargado desde https://picocss.com/ -->
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>listacompras</title>
    </head>

    <body>
        <div id="root"></div>
        <script type="module" src="/src/main.jsx"></script>
    </body>
</html>
```

---
