// ============================================================================
// SERVIDOR BACKEND - NODEMAILER CON EXPRESS
// ============================================================================
// Este archivo implementa un servidor Express que permite enviar correos
// electrónicos utilizando Nodemailer y SMTP de Gmail

// ============================================================================
// IMPORTACIONES DE MÓDULOS
// ============================================================================

// Express: Framework web para Node.js que facilita la creación de APIs REST
import express from "express";

// CORS: Middleware que permite peticiones desde diferentes orígenes (frontend)
// Esto es necesario porque el frontend (puerto 5173) necesita comunicarse
// con el backend (puerto 3001)
import cors from "cors";

// Dotenv: Carga las variables de entorno desde el archivo .env
// Esto nos permite mantener las credenciales seguras y fuera del código
import dotenv from "dotenv";

// Nodemailer: Librería principal para enviar correos electrónicos
import nodemailer from "nodemailer";

// ============================================================================
// CONFIGURACIÓN INICIAL
// ============================================================================

// Cargar las variables de entorno del archivo .env
// Después de esto, podemos acceder a las variables con process.env.NOMBRE_VARIABLE
dotenv.config();

// Crear una instancia de la aplicación Express
const app = express();

// ============================================================================
// MIDDLEWARES
// ============================================================================

// CORS: Permite que el frontend (diferente puerto/origen) pueda hacer peticiones
// Sin esto, el navegador bloquearía las peticiones por seguridad
app.use(cors());

// Express JSON: Permite que Express interprete automáticamente el cuerpo (body)
// de las peticiones que vienen en formato JSON
// Sin esto, req.body sería undefined
app.use(express.json());

// ============================================================================
// CONFIGURACIÓN DEL TRANSPORTER DE NODEMAILER
// ============================================================================

// El transporter es el objeto que se encarga de enviar los correos
// Lo configuramos con los datos del servidor SMTP
const transporter = nodemailer.createTransport({
  // Host del servidor SMTP (para Gmail es smtp.gmail.com)
  host: process.env.SMTP_HOST,

  // Puerto del servidor SMTP
  // 587 es el puerto para STARTTLS (más común)
  // 465 es para SSL/TLS directo
  port: Number(process.env.SMTP_PORT || 587),

  // Secure indica si la conexión debe usar TLS/SSL desde el inicio
  // true para puerto 465, false para 587 (que usa STARTTLS)
  secure: Number(process.env.SMTP_PORT) === 465,

  // Credenciales de autenticación SMTP
  auth: {
    // Usuario (generalmente tu email completo)
    user: process.env.SMTP_USER,

    // Contraseña de aplicación de Gmail (NO tu contraseña normal)
    // Debe ser generada desde la configuración de seguridad de Google
    pass: process.env.SMTP_PASS,
  },
});

// ============================================================================
// VERIFICACIÓN DE CONEXIÓN SMTP
// ============================================================================

// Verificar que la configuración SMTP sea correcta al iniciar el servidor
// Esto ayuda a detectar problemas de credenciales o conexión tempranamente
transporter.verify()
  .then(() => console.log("✅ SMTP configurado correctamente"))
  .catch((err) => console.error("❌ Error verificando SMTP:", err.message));

// ============================================================================
// ENDPOINT PARA ENVIAR CORREOS
// ============================================================================

// POST /send-email - Endpoint principal para enviar correos electrónicos
// El cliente debe enviar un JSON con: to, subject, y text o html
app.post("/send-email", async (req, res) => {
  // Extraer los datos del cuerpo de la petición
  const { to, subject, text, html } = req.body;

  // ============================================================================
  // VALIDACIÓN DE CAMPOS OBLIGATORIOS
  // ============================================================================

  // Verificar que se envíen los campos mínimos necesarios
  // - to: email del destinatario
  // - subject: asunto del correo
  // - text o html: contenido del mensaje (al menos uno)
  if (!to || !subject || (!text && !html)) {
    // Si falta algún campo, devolver un error 400 (Bad Request)
    return res.status(400).json({
      error: "Faltan campos obligatorios: to, subject, text|html"
    });
  }

  // ============================================================================
  // ENVÍO DEL CORREO
  // ============================================================================

  try {
    // Intentar enviar el correo usando el transporter configurado
    const info = await transporter.sendMail({
      // Remitente (de dónde viene el correo)
      from: process.env.FROM_EMAIL,

      // Destinatario (a quién se envía)
      to,

      // Asunto del correo
      subject,

      // Contenido en texto plano
      text,

      // Contenido en HTML (opcional, pero permite formato enriquecido)
      html,
    });

    // Si el correo se envió exitosamente, devolver código 200 con información
    return res.json({
      message: "Correo enviado",
      messageId: info.messageId // ID único del mensaje enviado
    });

  } catch (err) {
    // ============================================================================
    // MANEJO DE ERRORES AL ENVIAR
    // ============================================================================

    // Si ocurre un error al enviar, registrarlo en consola para debugging
    console.error("Error enviando correo:", err);

    // Devolver error 500 (Internal Server Error) con detalles
    return res.status(500).json({
      error: "Error enviando correo",
      details: err.message
    });
  }
});

// ============================================================================
// INICIAR EL SERVIDOR
// ============================================================================

// Definir el puerto donde escuchará el servidor
// Si no hay variable de entorno PORT, usar 3001 por defecto
const PORT = process.env.PORT || 3001;

// Iniciar el servidor y escuchar en el puerto especificado
app.listen(PORT, () => console.log(`🚀 Backend escuchando en http://localhost:${PORT}`));
