// ============================================================
// IMPORTACIONES DE MÓDULOS NECESARIOS
// ============================================================

// Express: framework web para crear el servidor HTTP y manejar las rutas
import express from "express";

// CORS: middleware que permite que el frontend (en otro puerto) se conecte al backend
import cors from "cors";

// Dotenv: carga las variables de entorno desde el archivo .env
import dotenv from "dotenv";

// Nodemailer: biblioteca para enviar correos electrónicos
import nodemailer from "nodemailer";

// fs/promises: módulo del sistema de archivos con soporte para Promises (async/await)
import fs from "fs/promises";

// path: módulo para trabajar con rutas de archivos
import path from "path";

// ============================================================
// CONFIGURACIÓN INICIAL
// ============================================================

// Cargar las variables de entorno desde el archivo .env
// Esto permite acceder a process.env.SMTP_HOST, process.env.SMTP_USER, etc.
dotenv.config();

// Crear la aplicación Express
const app = express();

// Habilitar CORS para permitir peticiones desde cualquier origen (importante para desarrollo)
// Esto permite que el frontend (localhost:5173) pueda hacer peticiones al backend (localhost:3001)
app.use(cors());

// Middleware para parsear el cuerpo de las peticiones HTTP en formato JSON
// Esto permite acceder a req.body como objeto JavaScript
app.use(express.json());

// ============================================================
// CONSTANTES DE CONFIGURACIÓN
// ============================================================

// Ruta del archivo JSON donde se almacenarán los códigos OTP temporalmente
const OTP_FILE = path.resolve("./otp_store.json");

// Longitud del código OTP (6 dígitos)
const OTP_LENGTH = 6;

// Tiempo de expiración del OTP en minutos (toma el valor del .env o usa 10 por defecto)
const OTP_EXP_MIN = Number(process.env.OTP_EXPIRATION_MINUTES || 10);

// ============================================================
// CONFIGURACIÓN DE NODEMAILER
// ============================================================

// Crear el transporter de Nodemailer con la configuración SMTP
// Este objeto es el encargado de conectarse al servidor de correo y enviar emails
const transporter = nodemailer.createTransport({
    // Host del servidor SMTP (ej: smtp.gmail.com)
    host: process.env.SMTP_HOST,

    // Puerto del servidor SMTP (587 para TLS, 465 para SSL)
    port: Number(process.env.SMTP_PORT || 587),

    // Si el puerto es 465, usar conexión segura (SSL), sino usar TLS (puerto 587)
    secure: Number(process.env.SMTP_PORT) === 465,

    // Credenciales de autenticación para el servidor SMTP
    auth: {
        // Dirección de correo que enviará los emails
        user: process.env.SMTP_USER,

        // Contraseña de aplicación (NO la contraseña normal de Gmail)
        // En Gmail, se genera desde la configuración de seguridad de la cuenta
        pass: process.env.SMTP_PASS,
    },
});

// ============================================================
// FUNCIONES UTILITARIAS
// ============================================================

/**
 * Lee el archivo JSON donde se almacenan los OTPs
 * Si el archivo no existe, lo crea vacío
 * @returns {Promise<Object>} - Objeto con la estructura { email: { code, expiresAt } }
 */
async function readOtpStore() {
    try {
        // Intentar leer el contenido del archivo
        const raw = await fs.readFile(OTP_FILE, "utf-8");

        // Parsear el JSON y devolverlo como objeto
        return JSON.parse(raw || "{}");
    } catch (err) {
        // Si el error es que el archivo no existe (ENOENT)
        if (err.code === "ENOENT") {
            // Crear el archivo con un objeto vacío
            await fs.writeFile(OTP_FILE, "{}");

            // Devolver objeto vacío
            return {};
        }

        // Si es otro tipo de error, propagarlo
        throw err;
    }
}

/**
 * Escribe el objeto de OTPs en el archivo JSON
 * @param {Object} obj - Objeto con la estructura { email: { code, expiresAt } }
 */
async function writeOtpStore(obj) {
    // Convertir el objeto a JSON con formato legible (indentación de 2 espacios)
    // y escribirlo en el archivo
    await fs.writeFile(OTP_FILE, JSON.stringify(obj, null, 2));
}

/**
 * Genera un código OTP aleatorio de n dígitos
 * @param {number} length - Cantidad de dígitos del código (por defecto 6)
 * @returns {string} - Código OTP generado (ej: "123456")
 */
function generateOtp(length = OTP_LENGTH) {
    // Inicializar el código como string vacío
    let code = "";

    // Generar cada dígito del código
    for (let i = 0; i < length; i++) {
        // Generar un número aleatorio entre 0 y 9 y agregarlo al código
        code += Math.floor(Math.random() * 10).toString();
    }

    // Devolver el código completo
    return code;
}

// ============================================================
// RUTAS (ENDPOINTS) DEL API
// ============================================================

/**
 * POST /request-otp
 * Endpoint para solicitar un código OTP
 * Espera recibir { email: "usuario@ejemplo.com" } en el body
 */
app.post("/request-otp", async (req, res) => {
    // Extraer el email del cuerpo de la petición
    const { email } = req.body;

    // Validar que se haya enviado el email
    if (!email) return res.status(400).json({ error: "Falta el campo email" });

    // ============================================================
    // PASO 1: GENERAR EL CÓDIGO OTP Y CALCULAR SU EXPIRACIÓN
    // ============================================================

    // Generar un código aleatorio de 6 dígitos
    const code = generateOtp();

    // Calcular el timestamp de expiración (momento actual + minutos de expiración)
    // Date.now() retorna milisegundos, por eso multiplicamos por 60 * 1000
    const expiresAt = Date.now() + OTP_EXP_MIN * 60 * 1000;

    // ============================================================
    // PASO 2: GUARDAR EL OTP EN EL ARCHIVO JSON
    // ============================================================

    // Leer el archivo de OTPs existentes
    const store = await readOtpStore();

    // Agregar o actualizar la entrada para este email con el nuevo código y expiración
    store[email] = { code, expiresAt };

    // Escribir el archivo actualizado
    await writeOtpStore(store);

    // ============================================================
    // PASO 3: ENVIAR EL CÓDIGO POR EMAIL USANDO NODEMAILER
    // ============================================================

    // Configurar las opciones del email a enviar
    const mailOptions = {
        // Remitente (debe ser el mismo que SMTP_USER o uno autorizado)
        from: process.env.FROM_EMAIL,

        // Destinatario (el email que solicitó el OTP)
        to: email,

        // Asunto del correo
        subject: "Tu código de verificación (OTP)",

        // Contenido del email en texto plano (para clientes que no soportan HTML)
        text: `Tu código de verificación es: ${code}\n\nEste código expira en ${OTP_EXP_MIN} minutos.`,

        // Contenido del email en formato HTML (con estilos)
        html: `<p>Tu código de verificación es: <strong>${code}</strong></p><p>Expira en ${OTP_EXP_MIN} minutos.</p>`,
    };

    try {
        // Intentar enviar el email usando el transporter de Nodemailer
        const info = await transporter.sendMail(mailOptions);

        // Mostrar en consola que el email se envió correctamente
        console.log("OTP enviado:", info.messageId);

        // Responder al frontend con éxito
        return res.json({ ok: true, message: "OTP enviado" });
    } catch (err) {
        // Si hubo un error al enviar el email
        console.error("Error enviando OTP:", err);

        // Responder al frontend con error 500 (error del servidor)
        return res
            .status(500)
            .json({ error: "Error enviando OTP", details: err.message });
    }
});

/**
 * POST /verify-otp
 * Endpoint para verificar un código OTP
 * Espera recibir { email: "usuario@ejemplo.com", code: "123456" } en el body
 */
app.post("/verify-otp", async (req, res) => {
    // Extraer el email y el código del cuerpo de la petición
    const { email, code } = req.body;

    // Validar que se hayan enviado ambos campos
    if (!email || !code)
        return res.status(400).json({ error: "Faltan campos" });

    // ============================================================
    // PASO 1: BUSCAR EL OTP GUARDADO PARA ESTE EMAIL
    // ============================================================

    // Leer el archivo de OTPs
    const store = await readOtpStore();

    // Buscar la entrada correspondiente a este email
    const entry = store[email];

    // Si no existe una entrada para este email, significa que nunca se solicitó un OTP
    if (!entry)
        return res
            .status(400)
            .json({ error: "No hay OTP solicitado para este email" });

    // ============================================================
    // PASO 2: VERIFICAR SI EL OTP EXPIRÓ
    // ============================================================

    // Comparar el momento actual con el timestamp de expiración
    if (Date.now() > entry.expiresAt) {
        // El OTP expiró, eliminarlo del archivo
        delete store[email];
        await writeOtpStore(store);

        // Responder con error de OTP expirado
        return res.status(400).json({ error: "OTP expirado" });
    }

    // ============================================================
    // PASO 3: VERIFICAR SI EL CÓDIGO ES CORRECTO
    // ============================================================

    // Comparar el código enviado con el código guardado
    if (entry.code !== code) {
        // El código es incorrecto
        return res.status(400).json({ error: "Código incorrecto" });
    }

    // ============================================================
    // PASO 4: VERIFICACIÓN EXITOSA
    // ============================================================

    // Eliminar el OTP del archivo (ya fue usado y verificado correctamente)
    delete store[email];
    await writeOtpStore(store);

    // Responder al frontend indicando que la verificación fue exitosa
    return res.json({ ok: true, message: "Email verificado" });
});

// ============================================================
// INICIAR EL SERVIDOR
// ============================================================

// Obtener el puerto desde las variables de entorno o usar 3001 por defecto
const PORT = Number(process.env.PORT || 3001);

// Iniciar el servidor Express en el puerto especificado
app.listen(PORT, () =>
    console.log(`OTP backend escuchando en http://localhost:${PORT}`)
);
