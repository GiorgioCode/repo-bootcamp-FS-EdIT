
# Guía: Código de verificación (OTP) por correo usando Nodemailer

> Propósito: Explicar y mostrar un ejemplo simple de **OTP (One-Time Password)** enviado por email y validado por la aplicación.  
> Nota: ejemplo didáctico — **no usar** tal cual en producción sin mejoras de seguridad.

---

## Resumen del flujo

1. El usuario ingresa su correo en el frontend y solicita un OTP.
2. El backend genera un código numérico (OTP), lo guarda temporalmente en un archivo JSON con expiración y lo envía por email mediante **Nodemailer**.
3. El usuario recibe el código, lo ingresa en el frontend.
4. El frontend envía el código al backend para verificarlo.
5. Si el código coincide y no está expirado, la verificación es exitosa; el registro se borra del archivo JSON.

---

## Requisitos

- Node.js (>=16)
- npm
- Cuenta SMTP para pruebas (Gmail con App Password, Mailgun, etc.)
- Conocimientos básicos de JavaScript, Node.js y React/Vite

---

## Estructura de proyecto recomendada

```
otp-demo/
├─ backend/
│  ├─ package.json
│  ├─ server.js
│  ├─ .env
│  └─ otp_store.json
└─ frontend/
   ├─ package.json
   └─ src/
      ├─ main.jsx
      └─ App.jsx
```

---

## Variables de entorno (backend/.env)

```
PORT=3001
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=tu_usuario_smtp
SMTP_PASS=tu_contraseña_smtp
FROM_EMAIL=tu@dominio.com
OTP_EXPIRATION_MINUTES=10
```

---

## Backend (Node.js + Express + Nodemailer)

### 1) Inicializar

```bash
cd otp-demo/backend
npm init -y
npm install express nodemailer dotenv cors
```

Asegurate en `package.json` de agregar `"type": "module"` si usás `import`:

```json
{
  "name": "otp-backend",
  "version": "1.0.0",
  "type": "module",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "express": "^4.18.2",
    "nodemailer": "^6.9.0"
  }
}
```

### 2) Archivo `otp_store.json`

Crea un archivo `otp_store.json` con contenido inicial:

```json
{}
```

Este archivo almacenará temporalmente los OTPs en formato:

```json
{
  "usuario@example.com": {
    "code": "123456",
    "expiresAt": 1700000000000
  }
}
```

### 3) `server.js` (código completo)

```js
// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const OTP_FILE = path.resolve("./otp_store.json");
const OTP_LENGTH = 6;
const OTP_EXP_MIN = Number(process.env.OTP_EXPIRATION_MINUTES || 10);

// Configurar transporter de Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Funciones utilitarias
async function readOtpStore() {
  try {
    const raw = await fs.readFile(OTP_FILE, "utf-8");
    return JSON.parse(raw || "{}");
  } catch (err) {
    if (err.code === "ENOENT") {
      await fs.writeFile(OTP_FILE, "{}");
      return {};
    }
    throw err;
  }
}

async function writeOtpStore(obj) {
  await fs.writeFile(OTP_FILE, JSON.stringify(obj, null, 2));
}

function generateOtp(length = OTP_LENGTH) {
  let code = "";
  for (let i = 0; i < length; i++) {
    code += Math.floor(Math.random() * 10).toString();
  }
  return code;
}

// Endpoint para solicitar OTP
app.post("/request-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Falta el campo email" });

  // Generar OTP y expiración
  const code = generateOtp();
  const expiresAt = Date.now() + OTP_EXP_MIN * 60 * 1000;

  // Guardar en archivo JSON
  const store = await readOtpStore();
  store[email] = { code, expiresAt };
  await writeOtpStore(store);

  // Enviar email con Nodemailer
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: email,
    subject: "Tu código de verificación (OTP)",
    text: `Tu código de verificación es: ${code}\n\nEste código expira en ${OTP_EXP_MIN} minutos.`,
    html: `<p>Tu código de verificación es: <strong>${code}</strong></p><p>Expira en ${OTP_EXP_MIN} minutos.</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("OTP enviado:", info.messageId);
    return res.json({ ok: true, message: "OTP enviado" });
  } catch (err) {
    console.error("Error enviando OTP:", err);
    return res.status(500).json({ error: "Error enviando OTP", details: err.message });
  }
});

// Endpoint para verificar OTP
app.post("/verify-otp", async (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) return res.status(400).json({ error: "Faltan campos" });

  const store = await readOtpStore();
  const entry = store[email];

  if (!entry) return res.status(400).json({ error: "No hay OTP solicitado para este email" });

  if (Date.now() > entry.expiresAt) {
    // eliminar entrada vencida
    delete store[email];
    await writeOtpStore(store);
    return res.status(400).json({ error: "OTP expirado" });
  }

  if (entry.code !== code) {
    return res.status(400).json({ error: "Código incorrecto" });
  }

  // Verificación exitosa: eliminar y responder OK
  delete store[email];
  await writeOtpStore(store);
  return res.json({ ok: true, message: "Email verificado" });
});

const PORT = Number(process.env.PORT || 3001);
app.listen(PORT, () => console.log(`OTP backend escuchando en http://localhost:${PORT}`));
```

---

## Frontend (React + Vite)

### 1) Inicializar

```bash
cd otp-demo
npm create vite@latest frontend -- --template react
cd frontend
npm install
```

### 2) `src/App.jsx`

```jsx
import { useState } from "react";

export default function App() {
  const [email, setEmail] = useState("");
  const [phase, setPhase] = useState("request"); // "request" | "verify" | "done"
  const [message, setMessage] = useState("");
  const [code, setCode] = useState("");

  const requestOtp = async (e) => {
    e.preventDefault();
    setMessage("Enviando OTP...");
    try {
      const res = await fetch("http://localhost:3001/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error desconocido");
      setMessage("OTP enviado. Revisa tu correo.");
      setPhase("verify");
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setMessage("Verificando...");
    try {
      const res = await fetch("http://localhost:3001/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error desconocido");
      setMessage("Email verificado correctamente.");
      setPhase("done");
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div style={{ maxWidth: 720, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>Verificación por correo (OTP) — Demo</h1>

      {phase === "request" && (
        <form onSubmit={requestOtp}>
          <label>Correo electrónico:</label><br/>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} required style={{width:"100%"}} /><br/><br/>
          <button type="submit">Solicitar OTP</button>
        </form>
      )}

      {phase === "verify" && (
        <form onSubmit={verifyOtp}>
          <p>OTP enviado a: <strong>{email}</strong></p>
          <label>Ingresa el código (OTP):</label><br/>
          <input value={code} onChange={(e)=>setCode(e.target.value)} required style={{width:"100%"}} /><br/><br/>
          <button type="submit">Verificar</button>
        </form>
      )}

      {phase === "done" && (
        <div>
          <p>✅ Correo verificado: <strong>{email}</strong></p>
        </div>
      )}

      {message && <p><strong>Estado:</strong> {message}</p>}
    </div>
  );
}
```

### 3) Ejecutar frontend

```bash
cd frontend
npm run dev
# Abrir la URL que Vite muestre (por ejemplo http://localhost:5173)
```

---

## Consideraciones de seguridad y mejoras (NO usar tal cual en producción)

- **No almacenar OTP en texto plano**: el ejemplo lo almacena en texto en JSON para simplicidad. En producción guarda hashes temporales (ej: bcrypt) o usa una base de datos con TTL (Redis).
- **Rate limiting**: limita la cantidad de solicitudes por email/IP para evitar abuso.
- **Protección del endpoint**: requiere autenticación o al menos CAPTCHA para evitar envío masivo.
- **Expiraciones y limpieza**: implementa limpieza periódica de OTP expirados (cron / background job).
- **Un solo uso**: asegúrate que al verificar se elimine la entrada (ya hecho en el ejemplo).
- **Limitación de intentos**: bloquea o invalida después de N intentos fallidos.
- **Logs sensibles**: evita logs que contengan OTP en producción.
- **Entrega de email**: usa proveedores con buena reputación (SendGrid, Mailgun, SES) para mejorar entregabilidad.

---

## Pruebas rápidas

1. Levantá el backend (`node server.js`) después de configurar `.env`.
2. Levantá el frontend (`npm run dev`) y abrí la app.
3. Solicitá OTP con un email que controles.
4. Revisá el email, copiá el código y pegalo en la pantalla de verificación.
5. Deberías ver la respuesta de verificación exitosa.

---

## Extensiones posibles

- Guardar un `verified: true` en la base de datos de usuarios.
- Generar token JWT al verificar y usarlo para sesiones.
- Reemplazar almacenamiento por Redis con TTL.
- Añadir reenvío de OTP y contador de intentos.

---
