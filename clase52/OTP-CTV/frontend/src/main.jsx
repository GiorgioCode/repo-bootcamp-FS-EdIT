// ========================================
// IMPORTACIONES
// ========================================

// Importar React (necesario para JSX)
import React from "react";

// Importar createRoot de React DOM para renderizar la aplicación
import { createRoot } from "react-dom/client";

// Importar el componente App (página principal con el formulario)
import App from "./App";

// Importar el componente Verified (página de resultados de verificación)
import Verified from "./Verified";

// ========================================
// COMPONENTE ROUTER (ENRUTADOR SIMPLE)
// ========================================

/**
 * Componente simple de routing que decide qué página mostrar
 * basándose en la ruta actual del navegador
 */
function Router() {
    // Obtener la ruta actual del navegador (ej: "/", "/verified")
    const path = window.location.pathname;

    // Si la ruta comienza con "/verified", mostrar el componente Verified
    if (path.startsWith("/verified")) return <Verified />;

    // Si no, mostrar el componente App (página principal)
    return <App />;
}

// ========================================
// RENDERIZADO INICIAL DE LA APLICACIÓN
// ========================================

// Obtener el elemento del DOM con id="root" y crear la raíz de React
// Luego renderizar el componente Router que decidirá qué mostrar
createRoot(document.getElementById("root")).render(<Router />);
