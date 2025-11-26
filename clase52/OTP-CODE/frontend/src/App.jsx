// ============================================================
// IMPORTACIONES DE REACT
// ============================================================

// useState: hook de React para manejar el estado del componente
import { useState } from "react";

// ============================================================
// COMPONENTE PRINCIPAL DE LA APLICACIÓN
// ============================================================

export default function App() {
    // ============================================================
    // ESTADOS DEL COMPONENTE
    // ============================================================

    // Estado para almacenar el email ingresado por el usuario
    const [email, setEmail] = useState("");

    // Estado para controlar en qué fase del flujo estamos:
    // - "request": fase inicial donde se solicita el OTP
    // - "verify": fase donde se ingresa el código recibido por email
    // - "done": fase final cuando el email ha sido verificado correctamente
    const [phase, setPhase] = useState("request");

    // Estado para mostrar mensajes de estado al usuario (éxito, error, cargando, etc.)
    const [message, setMessage] = useState("");

    // Estado para almacenar el código OTP ingresado por el usuario
    const [code, setCode] = useState("");

    // ============================================================
    // FUNCIÓN PARA SOLICITAR UN CÓDIGO OTP
    // ============================================================

    /**
     * Función que se ejecuta cuando el usuario envía el formulario para solicitar un OTP
     * Hace una petición POST al backend con el email
     */
    const requestOtp = async (e) => {
        // Prevenir el comportamiento por defecto del formulario (no recargar la página)
        e.preventDefault();

        // Mostrar mensaje de carga al usuario
        setMessage("Enviando OTP...");

        try {
            // ============================================================
            // HACER PETICIÓN HTTP AL BACKEND PARA SOLICITAR OTP
            // ============================================================

            // Hacer una petición POST al endpoint /request-otp del backend
            const res = await fetch("http://localhost:3001/request-otp", {
                // Método HTTP POST
                method: "POST",

                // Headers indicando que enviamos JSON
                headers: { "Content-Type": "application/json" },

                // Cuerpo de la petición: convertir el objeto { email } a JSON
                body: JSON.stringify({ email }),
            });

            // Parsear la respuesta del servidor como JSON
            const data = await res.json();

            // Si la respuesta HTTP no fue exitosa (código 4xx o 5xx), lanzar error
            if (!res.ok) throw new Error(data.error || "Error desconocido");

            // ============================================================
            // SI LA PETICIÓN FUE EXITOSA
            // ============================================================

            // Mostrar mensaje de éxito al usuario
            setMessage("OTP enviado. Revisa tu correo.");

            // Cambiar a la fase de verificación (mostrar el formulario para ingresar el código)
            setPhase("verify");
        } catch (err) {
            // ============================================================
            // SI HUBO UN ERROR EN LA PETICIÓN
            // ============================================================

            // Mostrar el mensaje de error al usuario
            setMessage("Error: " + err.message);
        }
    };

    // ============================================================
    // FUNCIÓN PARA VERIFICAR EL CÓDIGO OTP
    // ============================================================

    /**
     * Función que se ejecuta cuando el usuario envía el formulario para verificar el código OTP
     * Hace una petición POST al backend con el email y el código
     */
    const verifyOtp = async (e) => {
        // Prevenir el comportamiento por defecto del formulario (no recargar la página)
        e.preventDefault();

        // Mostrar mensaje de carga al usuario
        setMessage("Verificando...");

        try {
            // ============================================================
            // HACER PETICIÓN HTTP AL BACKEND PARA VERIFICAR OTP
            // ============================================================

            // Hacer una petición POST al endpoint /verify-otp del backend
            const res = await fetch("http://localhost:3001/verify-otp", {
                // Método HTTP POST
                method: "POST",

                // Headers indicando que enviamos JSON
                headers: { "Content-Type": "application/json" },

                // Cuerpo de la petición: convertir el objeto { email, code } a JSON
                body: JSON.stringify({ email, code }),
            });

            // Parsear la respuesta del servidor como JSON
            const data = await res.json();

            // Si la respuesta HTTP no fue exitosa (código 4xx o 5xx), lanzar error
            if (!res.ok) throw new Error(data.error || "Error desconocido");

            // ============================================================
            // SI LA VERIFICACIÓN FUE EXITOSA
            // ============================================================

            // Mostrar mensaje de éxito al usuario
            setMessage("Email verificado correctamente.");

            // Cambiar a la fase final (mostrar confirmación de verificación exitosa)
            setPhase("done");
        } catch (err) {
            // ============================================================
            // SI HUBO UN ERROR EN LA VERIFICACIÓN
            // ============================================================

            // Mostrar el mensaje de error al usuario
            setMessage("Error: " + err.message);
        }
    };

    // ============================================================
    // RENDERIZADO DEL COMPONENTE (UI)
    // ============================================================

    return (
        // Contenedor principal con estilos básicos
        <div
            style={{
                maxWidth: 720,              // Ancho máximo de 720px
                margin: "2rem auto",        // Margen superior/inferior de 2rem, centrado horizontalmente
                fontFamily: "sans-serif",   // Fuente sans-serif
            }}
        >
            {/* Título principal de la aplicación */}
            <h1>Verificación por correo (OTP) — Demo</h1>

            {/* ============================================================ */}
            {/* FASE 1: FORMULARIO PARA SOLICITAR OTP */}
            {/* Solo se muestra cuando phase === "request" */}
            {/* ============================================================ */}

            {phase === "request" && (
                // Formulario que llama a requestOtp cuando se envía
                <form onSubmit={requestOtp}>
                    {/* Etiqueta del campo de email */}
                    <label>Correo electrónico:</label>
                    <br />

                    {/* Campo de entrada para el email */}
                    <input
                        // El valor del input está vinculado al estado 'email'
                        value={email}

                        // Cada vez que el usuario escribe, se actualiza el estado 'email'
                        onChange={(e) => setEmail(e.target.value)}

                        // Campo requerido (no se puede enviar el formulario sin completarlo)
                        required

                        // Estilo para que ocupe todo el ancho disponible
                        style={{ width: "100%" }}
                    />
                    <br />
                    <br />

                    {/* Botón para enviar el formulario y solicitar el OTP */}
                    <button type="submit">Solicitar OTP</button>
                </form>
            )}

            {/* ============================================================ */}
            {/* FASE 2: FORMULARIO PARA VERIFICAR OTP */}
            {/* Solo se muestra cuando phase === "verify" */}
            {/* ============================================================ */}

            {phase === "verify" && (
                // Formulario que llama a verifyOtp cuando se envía
                <form onSubmit={verifyOtp}>
                    {/* Mostrar al usuario a qué email se envió el OTP */}
                    <p>
                        OTP enviado a: <strong>{email}</strong>
                    </p>

                    {/* Etiqueta del campo de código OTP */}
                    <label>Ingresa el código (OTP):</label>
                    <br />

                    {/* Campo de entrada para el código OTP */}
                    <input
                        // El valor del input está vinculado al estado 'code'
                        value={code}

                        // Cada vez que el usuario escribe, se actualiza el estado 'code'
                        onChange={(e) => setCode(e.target.value)}

                        // Campo requerido (no se puede enviar el formulario sin completarlo)
                        required

                        // Estilo para que ocupe todo el ancho disponible
                        style={{ width: "100%" }}
                    />
                    <br />
                    <br />

                    {/* Botón para enviar el formulario y verificar el OTP */}
                    <button type="submit">Verificar</button>
                </form>
            )}

            {/* ============================================================ */}
            {/* FASE 3: CONFIRMACIÓN DE VERIFICACIÓN EXITOSA */}
            {/* Solo se muestra cuando phase === "done" */}
            {/* ============================================================ */}

            {phase === "done" && (
                <div>
                    {/* Mensaje de confirmación mostrando el email verificado */}
                    <p>
                        ✅ Correo verificado: <strong>{email}</strong>
                    </p>
                </div>
            )}

            {/* ============================================================ */}
            {/* MENSAJES DE ESTADO */}
            {/* Se muestra siempre que haya un mensaje (éxito, error, cargando...) */}
            {/* ============================================================ */}

            {message && (
                <p>
                    <strong>Estado:</strong> {message}
                </p>
            )}
        </div>
    );
}
