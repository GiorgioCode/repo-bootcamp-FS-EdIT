// Punto de entrada de la app: crea el root de React y monta <App />.
import React from "react"; // Importa React (necesario para JSX en algunas configuraciones)
import { createRoot } from "react-dom/client"; // Importa createRoot para React 18+
import App from "./App"; // Importa el componente raíz de la aplicación
import "./index.css"; // Importa estilos globales mínimos

// Obtiene el elemento del DOM donde React montará la app
const container = document.getElementById("root"); // query al DOM por el id 'root'
const root = createRoot(container); // crea el root de React usando el contenedor
root.render(<App />); // renderiza el componente <App /> dentro del root
