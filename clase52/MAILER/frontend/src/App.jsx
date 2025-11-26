// ============================================================================
// COMPONENTE PRINCIPAL - FORMULARIO DE ENVÍO DE CORREOS
// ============================================================================
// Este componente de React implementa un formulario para enviar correos
// electrónicos comunicándose con el backend de Nodemailer

// ============================================================================
// IMPORTACIONES
// ============================================================================

// useState: Hook de React que permite manejar estado en componentes funcionales
import { useState } from "react";

// Importar los estilos CSS del componente
import "./App.css";

// ============================================================================
// COMPONENTE APP
// ============================================================================

export default function App() {
  // ==========================================================================
  // ESTADO DEL COMPONENTE (useState)
  // ==========================================================================

  // Estado para el campo "Destinatario" (email del receptor)
  // to: valor actual del campo
  // setTo: función para actualizar el valor
  const [to, setTo] = useState("");

  // Estado para el campo "Asunto" del correo
  const [subject, setSubject] = useState("");

  // Estado para el campo "Mensaje" (cuerpo del correo)
  const [body, setBody] = useState("");

  // Estado para mostrar mensajes de éxito o error
  // Puede ser null (sin mensaje) o un objeto con { type, message }
  const [status, setStatus] = useState(null);

  // Estado para controlar si el formulario está enviando datos
  // true: el formulario está procesando, false: formulario listo
  const [isLoading, setIsLoading] = useState(false);

  // ==========================================================================
  // FUNCIÓN PARA MANEJAR EL ENVÍO DEL FORMULARIO
  // ==========================================================================

  const handleSubmit = async (e) => {
    // Prevenir el comportamiento por defecto del formulario (recargar la página)
    e.preventDefault();

    // Activar el estado de carga (mostrar spinner, deshabilitar botón)
    setIsLoading(true);

    // Limpiar cualquier mensaje de estado anterior
    setStatus(null);

    try {
      // ========================================================================
      // PETICIÓN HTTP AL BACKEND
      // ========================================================================

      // Realizar petición POST al endpoint del backend
      // fetch es una API nativa del navegador para hacer peticiones HTTP
      const res = await fetch("http://localhost:3001/send-email", {
        // Método HTTP: POST (para enviar datos)
        method: "POST",

        // Cabeceras: indicamos que enviamos JSON
        headers: { "Content-Type": "application/json" },

        // Cuerpo de la petición: convertir objeto JavaScript a JSON
        body: JSON.stringify({
          to,       // Destinatario
          subject,  // Asunto
          text: body, // Mensaje (en texto plano)
        }),
      });

      // Convertir la respuesta del servidor de JSON a objeto JavaScript
      const data = await res.json();

      // ========================================================================
      // VALIDACIÓN DE RESPUESTA
      // ========================================================================

      // Si la respuesta no es exitosa (código HTTP 4xx o 5xx)
      if (!res.ok) throw new Error(data.error || "Error desconocido");

      // ========================================================================
      // RESPUESTA EXITOSA
      // ========================================================================

      // Mostrar mensaje de éxito con el ID del mensaje (si existe)
      setStatus({
        type: "success",
        message: `✅ Correo enviado exitosamente${data.messageId ? ` (ID: ${data.messageId})` : ""}`
      });

      // Limpiar todos los campos del formulario
      setTo("");
      setSubject("");
      setBody("");

    } catch (err) {
      // ========================================================================
      // MANEJO DE ERRORES
      // ========================================================================

      // Si ocurre algún error (de red, del servidor, etc.)
      // Mostrar mensaje de error al usuario
      setStatus({
        type: "error",
        message: `❌ Error: ${err.message}`
      });

    } finally {
      // ========================================================================
      // BLOQUE FINALLY (siempre se ejecuta)
      // ========================================================================

      // Desactivar el estado de carga sin importar si hubo éxito o error
      // Esto permite que el usuario pueda volver a enviar otro correo
      setIsLoading(false);
    }
  };

  // ==========================================================================
  // RENDERIZADO DEL COMPONENTE (JSX)
  // ==========================================================================

  return (
    <div className="app-container">
      {/* Tarjeta principal con el formulario */}
      <div className="card">

        {/* ================================================================== */}
        {/* ENCABEZADO */}
        {/* ================================================================== */}

        <div className="header">
          {/* Icono de correo con animación bounce */}
          <div className="icon">✉️</div>

          {/* Título principal con gradiente */}
          <h1>Sistema de Envío de Correos</h1>

          {/* Subtítulo con tecnologías */}
          <p className="subtitle">Nodemailer + React Vite</p>
        </div>

        {/* ================================================================== */}
        {/* FORMULARIO */}
        {/* ================================================================== */}

        {/* onSubmit: cuando se envía el formulario, ejecutar handleSubmit */}
        <form onSubmit={handleSubmit} className="email-form">

          {/* ================================================================ */}
          {/* CAMPO: DESTINATARIO */}
          {/* ================================================================ */}

          <div className="form-group">
            {/* Label del campo con icono */}
            <label htmlFor="to">
              <span className="label-icon">📧</span>
              Destinatario
            </label>

            {/* Input de tipo email */}
            <input
              id="to"
              type="email"
              value={to}  // Valor controlado por el estado
              // onChange: actualizar el estado cuando el usuario escribe
              onChange={(e) => setTo(e.target.value)}
              placeholder="ejemplo@gmail.com"
              required  // HTML5: campo obligatorio
              disabled={isLoading}  // Deshabilitar mientras se envía
            />
          </div>

          {/* ================================================================ */}
          {/* CAMPO: ASUNTO */}
          {/* ================================================================ */}

          <div className="form-group">
            <label htmlFor="subject">
              <span className="label-icon">📝</span>
              Asunto
            </label>

            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Ingrese el asunto del correo"
              required
              disabled={isLoading}
            />
          </div>

          {/* ================================================================ */}
          {/* CAMPO: MENSAJE */}
          {/* ================================================================ */}

          <div className="form-group">
            <label htmlFor="body">
              <span className="label-icon">💬</span>
              Mensaje
            </label>

            {/* Textarea para mensajes más largos */}
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Escriba su mensaje aquí..."
              required
              disabled={isLoading}
              rows={6}  // Altura inicial del textarea
            />
          </div>

          {/* ================================================================ */}
          {/* BOTÓN DE ENVÍO */}
          {/* ================================================================ */}

          <button
            type="submit"
            className="submit-btn"
            disabled={isLoading}  // Deshabilitar mientras se envía
          >
            {/* Renderizado condicional basado en isLoading */}
            {isLoading ? (
              // Si está cargando: mostrar spinner y texto "Enviando..."
              <>
                <span className="spinner"></span>
                Enviando...
              </>
            ) : (
              // Si NO está cargando: mostrar texto normal
              <>
                <span>🚀</span>
                Enviar Correo
              </>
            )}
          </button>
        </form>

        {/* ================================================================== */}
        {/* MENSAJE DE ESTADO (ÉXITO O ERROR) */}
        {/* ================================================================== */}

        {/* Renderizado condicional: solo mostrar si status tiene valor */}
        {status && (
          <div className={`status-message ${status.type}`}>
            {/* status.type puede ser "success" o "error" */}
            {/* Esto cambia la clase CSS para diferentes estilos */}
            {status.message}
          </div>
        )}
      </div>
    </div>
  );
}