# 🧭 Guía práctica: useNavigate() y useParams() en React Router

Esta guía explica de forma sencilla cómo funcionan los hooks **`useNavigate()`** y **`useParams()`** del paquete **React Router**, y cómo se usan en una aplicación creada con **Vite** o **Create React App**.

---

## 📦 1. Instalación de React Router

Antes de usar estos hooks, necesitamos instalar React Router:

```bash
npm install react-router-dom
```

---

## 🧩 2. Configuración básica del enrutador

Creamos un archivo `main.jsx` (o `main.js`) que envuelva nuestra app con el componente `BrowserRouter`:

```jsx
// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
```

---

## 🗺️ 3. Definiendo rutas en App.jsx

Creamos tres componentes:

-   `Inicio.jsx`
-   `Perfil.jsx`
-   `NoEncontrado.jsx`

Y los conectamos en `App.jsx`:

```jsx
// App.jsx
import { Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Perfil from "./pages/Perfil";
import NoEncontrado from "./pages/NoEncontrado";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/perfil/:nombreUsuario" element={<Perfil />} />
            <Route path="*" element={<NoEncontrado />} />
        </Routes>
    );
}

export default App;
```

---

## 🚀 4. useNavigate(): Navegación programática

El hook **`useNavigate()`** nos permite **redirigir al usuario desde el código** sin usar enlaces `<Link>`.

```jsx
// pages/Inicio.jsx
import { useNavigate } from "react-router-dom";

function Inicio() {
    const navigate = useNavigate();

    const irAlPerfil = () => {
        // Navegamos a la ruta con el parámetro "nombreUsuario"
        navigate("/perfil/Jorge");
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Página de inicio</h1>
            <button onClick={irAlPerfil}>Ir a mi perfil</button>
        </div>
    );
}

export default Inicio;
```

📘 **Explicación:**

-   `useNavigate()` devuelve una función.
-   Al ejecutarla (`navigate("/ruta")`), React Router cambia la vista actual por la nueva ruta.

También puedes navegar hacia atrás:

```js
navigate(-1); // retrocede una página en el historial
```

---

## 🧭 5. useParams(): Leer parámetros de la URL

El hook **`useParams()`** sirve para **obtener los valores** de los parámetros definidos en la ruta.

```jsx
// pages/Perfil.jsx
import { useParams, useNavigate } from "react-router-dom";

function Perfil() {
    const { nombreUsuario } = useParams();
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Perfil de {nombreUsuario}</h1>
            <p>Bienvenido a tu perfil, {nombreUsuario} 🎉</p>

            <button onClick={() => navigate("/")}>Volver al inicio</button>
        </div>
    );
}

export default Perfil;
```

📘 **Explicación:**

-   Si la ruta es `/perfil/Jorge`, entonces `useParams()` devolverá:
    ```js
    {
        nombreUsuario: "Jorge";
    }
    ```

---

## ⚠️ 6. Ruta no encontrada

Para manejar rutas inexistentes:

```jsx
// pages/NoEncontrado.jsx
function NoEncontrado() {
    return (
        <div style={{ textAlign: "center" }}>
            <h1>404</h1>
            <p>Página no encontrada 🚫</p>
        </div>
    );
}

export default NoEncontrado;
```

---

## ✅ Resumen

| Hook            | Función principal                            | Ejemplo                |
| --------------- | -------------------------------------------- | ---------------------- |
| `useNavigate()` | Navegar programáticamente entre rutas.       | `navigate("/home")`    |
| `useParams()`   | Obtener los valores de parámetros de la URL. | `{ id } = useParams()` |

---

## 🧠 Consejos finales

-   Ambos hooks **solo funcionan dentro de componentes renderizados por una ruta**.
-   Si usas React Router v6+, los nombres y sintaxis mostrados aquí ya son los actuales.
-   Es buena práctica definir nombres de parámetros en minúsculas (`:id`, `:nombre`, etc).
