// ========================================
// IMPORTACIONES
// ========================================

// Importar el hook useState de React para manejar el estado local del componente
import { useState } from "react";

// ========================================
// COMPONENTE PRINCIPAL: APP
// ========================================

export default function App() {
    // ========================================
    // ESTADOS DEL COMPONENTE
    // ========================================

    // Estado para almacenar el email ingresado por el usuario
    const [email, setEmail] = useState("");

    // Estado para mostrar mensajes de estado (cargando, éxito, error)
    const [message, setMessage] = useState("");

    // ========================================
    // FUNCIÓN PARA SOLICITAR VERIFICACIÓN
    // ========================================

    /**
     * Maneja el envío del formulario para solicitar el email de verificación
     * @param {Event} e - Evento del formulario
     */
    const request = async (e) => {
        // Prevenir el comportamiento por defecto del formulario (recargar la página)
        e.preventDefault();

        // Mostrar mensaje de "cargando" mientras se procesa
        setMessage("Enviando enlace de verificación...");

        try {
            // Realizar petición POST al backend en el endpoint /request-verification
            const res = await fetch(
                "http://localhost:3001/request-verification",
                {
                    method: "POST", // Método HTTP POST

                    // Indicar que estamos enviando JSON
                    headers: { "Content-Type": "application/json" },

                    // Convertir el email a formato JSON para enviarlo
                    body: JSON.stringify({ email }),
                }
            );

            // Parsear la respuesta JSON del servidor
            const data = await res.json();

            // Si la respuesta no es exitosa (status 200-299)
            if (!res.ok) throw new Error(data.error || "Error desconocido");

            // Si todo salió bien, mostrar mensaje de éxito
            setMessage("Enlace enviado. Revisá tu correo y hace click en él.");
        } catch (err) {
            // Si hubo algún error, mostrarlo al usuario
            setMessage("Error: " + err.message);
        }
    };

    // ========================================
    // RENDERIZADO DEL COMPONENTE
    // ========================================

    return (
        <div
            style={{
                maxWidth: 720,          // Ancho máximo del contenedor
                margin: "2rem auto",    // Margen vertical 2rem, centrado horizontalmente
                fontFamily: "sans-serif", // Fuente sans-serif
            }}
        >
            {/* Título principal de la página */}
            <h1>Verificación por enlace — Demo</h1>

            {/* Formulario para ingresar el email */}
            <form onSubmit={request}>
                {/* Etiqueta del campo de email */}
                <label>Correo electrónico:</label>
                <br />

                {/* Campo de entrada para el email */}
                <input
                    value={email}                          // Valor controlado por el estado
                    onChange={(e) => setEmail(e.target.value)} // Actualizar estado al escribir
                    required                               // Campo obligatorio
                    style={{ width: "100%" }}              // Ancho completo
                />
                <br />
                <br />

                {/* Botón para enviar el formulario */}
                <button type="submit">Enviar enlace de verificación</button>
            </form>

            {/* Mostrar mensaje de estado solo si existe */}
            {message && (
                <p>
                    <strong>Estado:</strong> {message}
                </p>
            )}
        </div>
    );
}
