// ========================================
// IMPORTACIONES
// ========================================

// Importar Express para crear el servidor web
import express from "express";

// Importar CORS para permitir solicitudes desde diferentes origenes (cross-origin)
import cors from "cors";

// Importar dotenv para cargar variables de entorno desde archivo .env
import dotenv from "dotenv";

// Importar Nodemailer para enviar emails
import nodemailer from "nodemailer";

// Importar módulo de sistema de archivos con promesas para operaciones asíncronas
import fs from "fs/promises";

// Importar path para manejar rutas de archivos de forma correcta
import path from "path";

// Importar función v4 de uuid para generar identificadores únicos
import { v4 as uuidv4 } from "uuid";

// ========================================
// CONFIGURACIÓN INICIAL
// ========================================

// Cargar las variables de entorno del archivo .env
dotenv.config();

// Crear la aplicación de Express
const app = express();

// Habilitar CORS para permitir peticiones desde el frontend
app.use(cors());

// Habilitar el middleware para parsear JSON en las peticiones
app.use(express.json());

// ========================================
// CONSTANTES DE CONFIGURACIÓN
// ========================================

// Ruta al archivo JSON donde se guardarán los tokens temporalmente
const OTP_FILE = path.resolve("./otp_store.json");

// Tiempo de expiración de los tokens en minutos (por defecto 15)
const EXP_MIN = Number(process.env.OTP_EXPIRATION_MINUTES || 15);

// URL base del frontend para redirecciones (por defecto localhost:5173)
const FRONTEND_BASE = process.env.FRONTEND_BASE_URL || "http://localhost:5173";

// ========================================
// CONFIGURACIÓN DE NODEMAILER
// ========================================

// Crear el transporter (transportador) de Nodemailer con configuración SMTP
const transporter = nodemailer.createTransport({
    // Host del servidor SMTP (ej: smtp.gmail.com)
    host: process.env.SMTP_HOST,

    // Puerto del servidor SMTP (587 para TLS, 465 para SSL)
    port: Number(process.env.SMTP_PORT || 587),

    // Si el puerto es 465, usar SSL (secure = true), sino TLS (secure = false)
    secure: Number(process.env.SMTP_PORT) === 465,

    // Credenciales de autenticación
    auth: {
        user: process.env.SMTP_USER, // Email del remitente
        pass: process.env.SMTP_PASS, // Contraseña o contraseña de aplicación
    },
});

// ========================================
// FUNCIONES UTILITARIAS PARA MANEJO DE ARCHIVOS
// ========================================

/**
 * Lee el archivo JSON donde se guardan los tokens
 * @returns {Object} Objeto con tokens como claves y datos como valores
 */
async function readStore() {
    try {
        // Intentar leer el archivo
        const raw = await fs.readFile(OTP_FILE, "utf-8");

        // Parsear el contenido JSON y retornarlo
        return JSON.parse(raw || "{}");
    } catch (err) {
        // Si el archivo no existe (código ENOENT)
        if (err.code === "ENOENT") {
            // Crear el archivo vacío
            await fs.writeFile(OTP_FILE, "{}");

            // Retornar objeto vacío
            return {};
        }
        // Si es otro error, lanzarlo
        throw err;
    }
}

/**
 * Escribe datos en el archivo JSON de tokens
 * @param {Object} obj - Objeto a guardar en el archivo
 */
async function writeStore(obj) {
    // Escribir el objeto como JSON formateado con indentación de 2 espacios
    await fs.writeFile(OTP_FILE, JSON.stringify(obj, null, 2));
}

// ========================================
// ENDPOINT: SOLICITAR VERIFICACIÓN
// ========================================

// Ruta POST para solicitar un email de verificación
app.post("/request-verification", async (req, res) => {
    // Extraer el email del cuerpo de la petición
    const { email } = req.body;

    // Validar que se haya enviado un email
    if (!email) return res.status(400).json({ error: "Falta el campo email" });

    // Generar un token único usando UUID v4
    const token = uuidv4();

    // Calcular la fecha de expiración (tiempo actual + minutos configurados)
    const expiresAt = Date.now() + EXP_MIN * 60 * 1000;

    // Leer el almacén actual de tokens
    const store = await readStore();

    // Guardar el token con su email y fecha de expiración asociados
    store[token] = { email, expiresAt };

    // Escribir los cambios al archivo
    await writeStore(store);

    // Construir la URL de verificación que apunta al backend
    // Esta URL será la que el usuario clickeará en su email
    const verifyUrl = `http://localhost:${process.env.PORT || 3001
        }/verify-email?token=${token}`;

    // Opción alternativa comentada: hacer que la URL apunte directamente al frontend
    // const verifyUrl = `${FRONTEND_BASE}/verify?token=${token}`;

    // Configurar las opciones del email a enviar
    const mailOptions = {
        from: process.env.FROM_EMAIL,       // Email remitente
        to: email,                          // Email destinatario
        subject: "Verifica tu email — Enlace de un solo click", // Asunto

        // Versión en texto plano
        text: `Haz click en el siguiente enlace para verificar tu correo:\n\n${verifyUrl}\n\nEl enlace expira en ${EXP_MIN} minutos.`,

        // Versión en HTML
        html: `<p>Haz click en el siguiente enlace para verificar tu correo:</p>
           <p><a href="${verifyUrl}" target="_blank" rel="noopener noreferrer">Verificar mi email</a></p>
           <p>El enlace expira en ${EXP_MIN} minutos.</p>`,
    };

    try {
        // Intentar enviar el email
        const info = await transporter.sendMail(mailOptions);

        // Mostrar en consola que el email fue enviado
        console.log("Verificación enviada:", info.messageId);

        // Responder al frontend con éxito
        return res.json({ ok: true, message: "Email de verificación enviado" });
    } catch (err) {
        // Si hay error al enviar el email
        console.error("Error enviando email:", err);

        // Responder al frontend con error
        return res
            .status(500)
            .json({ error: "Error enviando email", details: err.message });
    }
});

// ========================================
// ENDPOINT: VERIFICAR EMAIL (CALLBACK)
// ========================================

// Ruta GET que el usuario visita al hacer click en el enlace del email
app.get("/verify-email", async (req, res) => {
    // Extraer el token de los query parameters
    const token = req.query.token;

    // Validar que existe el token
    if (!token) return res.status(400).send("Falta token");

    // Leer el almacén de tokens
    const store = await readStore();

    // Buscar la entrada correspondiente al token
    const entry = store[token];

    // Si no existe el token en el almacén
    if (!entry) {
        // Redirigir al frontend con estado "invalid"
        return res.redirect(`${FRONTEND_BASE}/verified?status=invalid`);
    }

    // Verificar si el token ya expiró comparando tiempos
    if (Date.now() > entry.expiresAt) {
        // Eliminar el token expirado del almacén
        delete store[token];

        // Guardar los cambios
        await writeStore(store);

        // Redirigir al frontend con estado "expired"
        return res.redirect(`${FRONTEND_BASE}/verified?status=expired`);
    }

    // Si el token es válido y no ha expirado

    // Obtener el email asociado al token
    const email = entry.email;

    // Eliminar el token del almacén (ya fue usado)
    delete store[token];

    // Guardar los cambios
    await writeStore(store);

    // NOTA: Aquí podrías agregar lógica para marcar al usuario como verificado en tu base de datos

    // Redirigir al frontend con estado "success" y el email verificado
    return res.redirect(
        `${FRONTEND_BASE}/verified?status=success&email=${encodeURIComponent(
            email
        )}`
    );
});

// ========================================
// INICIO DEL SERVIDOR
// ========================================

// Configurar el puerto (por defecto 3001)
const PORT = Number(process.env.PORT || 3001);

// Iniciar el servidor y mostrar mensaje en consola
app.listen(PORT, () =>
    console.log(`Backend escuchando en http://localhost:${PORT}`)
);
