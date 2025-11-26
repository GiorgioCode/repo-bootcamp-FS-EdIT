# Guía: Verificación por correo mediante enlace con OTP (click-to-verify) — Nodemailer

> Fecha: 25 de noviembre de 2025  
> Propósito: Mostrar un ejemplo sencillo en el que el OTP se envía dentro de un enlace (parámetro `token`) en el correo; el usuario valida **haciendo click** en el enlace.  
> Nota: es un ejemplo didáctico. No usar tal cual en producción sin aplicar mejoras de seguridad.

---

## Resumen del flujo

1. El usuario ingresa su correo en el frontend y solicita verificación.
2. El backend genera un `token` (identificador único), lo guarda temporalmente con el email y expiración en `otp_store.json`.
3. El backend envía un email que contiene un enlace como `https://tu-app/verify?token=...`.
4. El usuario hace click en el enlace (desde su correo) y el backend valida el token.
5. Si el token existe y no expiró, la verificación es exitosa y la entrada se elimina.

---

## Requisitos

-   Node.js (>=16)
-   npm
-   Cuenta SMTP para pruebas (Gmail App Password, Mailgun, SendGrid)
-   Conocimientos básicos de JavaScript, Node.js y React/Vite

---

## Estructura sugerida

```
otp-click-demo/
├─ backend/
│  ├─ package.json
│  ├─ server.js
│  ├─ .env
│  └─ otp_store.json
└─ frontend/
   ├─ package.json
   └─ src/
      ├─ main.jsx
      ├─ App.jsx
      └─ Verified.jsx
```

---

## Variables de entorno (`backend/.env`)

```
PORT=3001
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=tu_usuario_smtp
SMTP_PASS=tu_contraseña_smtp
FROM_EMAIL=tu@dominio.com
FRONTEND_BASE_URL=http://localhost:5173
OTP_EXPIRATION_MINUTES=15
```

-   `FRONTEND_BASE_URL` se usa para construir el enlace que el usuario hará click (puede ser la URL de producción).
-   `OTP_EXPIRATION_MINUTES` controla la vigencia del token.

---

## Backend — Node.js + Express + Nodemailer

### 1) Inicializar

```bash
cd otp-click-demo/backend
npm init -y
npm install express nodemailer dotenv cors uuid
```

Asegurate de usar `"type": "module"` en `package.json` si empleás `import`.

### 2) `otp_store.json`

Crea el archivo con contenido inicial:

```json
{}
```

Formato esperado:

```json
{
    "a1b2c3d4-e5f6-...": {
        "email": "usuario@example.com",
        "expiresAt": 1700000000000
    }
}
```

La clave del objeto será el `token` (UUID v4).

### 3) `server.js` (ejemplo completo)

```js
// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const OTP_FILE = path.resolve("./otp_store.json");
const EXP_MIN = Number(process.env.OTP_EXPIRATION_MINUTES || 15);
const FRONTEND_BASE = process.env.FRONTEND_BASE_URL || "http://localhost:5173";

// Configurar transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// Utilidades de archivo
async function readStore() {
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

async function writeStore(obj) {
    await fs.writeFile(OTP_FILE, JSON.stringify(obj, null, 2));
}

// Endpoint: solicitar verificación (genera token y envía email con link)
app.post("/request-verification", async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Falta el campo email" });

    // Generar token
    const token = uuidv4();
    const expiresAt = Date.now() + EXP_MIN * 60 * 1000;

    // Guardar token -> email
    const store = await readStore();
    store[token] = { email, expiresAt };
    await writeStore(store);

    // Construir link de verificación (puede apuntar al frontend o al backend)
    // Opción 1: link que llama directamente al backend (GET) y backend redirige al frontend
    const verifyUrl = `http://localhost:${
        process.env.PORT || 3001
    }/verify-email?token=${token}`;

    // Opción 2 (si prefieres que el frontend maneje la ruta):
    // const verifyUrl = `${FRONTEND_BASE}/verify?token=${token}`;

    const mailOptions = {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: "Verifica tu email — Enlace de un solo click",
        text: `Haz click en el siguiente enlace para verificar tu correo:\n\n${verifyUrl}\n\nEl enlace expira en ${EXP_MIN} minutos.`,
        html: `<p>Haz click en el siguiente enlace para verificar tu correo:</p>
           <p><a href="${verifyUrl}" target="_blank" rel="noopener noreferrer">Verificar mi email</a></p>
           <p>El enlace expira en ${EXP_MIN} minutos.</p>`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Verificación enviada:", info.messageId);
        return res.json({ ok: true, message: "Email de verificación enviado" });
    } catch (err) {
        console.error("Error enviando email:", err);
        return res
            .status(500)
            .json({ error: "Error enviando email", details: err.message });
    }
});

// Endpoint: verificar token (GET) — responderá y luego redirigirá al frontend con resultado
app.get("/verify-email", async (req, res) => {
    const token = req.query.token;
    if (!token) return res.status(400).send("Falta token");

    const store = await readStore();
    const entry = store[token];

    if (!entry) {
        // Token inválido
        return res.redirect(`${FRONTEND_BASE}/verified?status=invalid`);
    }

    if (Date.now() > entry.expiresAt) {
        // Token expirado: eliminar y redirigir
        delete store[token];
        await writeStore(store);
        return res.redirect(`${FRONTEND_BASE}/verified?status=expired`);
    }

    // Token válido: eliminar y redirigir con éxito
    const email = entry.email;
    delete store[token];
    await writeStore(store);

    // Aquí podrías marcar al usuario como verificado en tu DB
    return res.redirect(
        `${FRONTEND_BASE}/verified?status=success&email=${encodeURIComponent(
            email
        )}`
    );
});

const PORT = Number(process.env.PORT || 3001);
app.listen(PORT, () =>
    console.log(`Backend escuchando en http://localhost:${PORT}`)
);
```

**Notas sobre diseño:**

-   El ejemplo usa una ruta GET `/verify-email?token=...` que valida y redirige al frontend con `status`.
-   Alternativamente podés hacer que el enlace apunte directamente al frontend (`/verify?token=`) y que el frontend invoque el backend para validar mediante `fetch`. Ambas son válidas; la primera es más simple (click directo).

---

## Frontend — React (Vite) (simple)

### 1) Inicializar

```bash
cd otp-click-demo
npm create vite@latest frontend -- --template react
cd frontend
npm install
```

### 2) `src/App.jsx` — solicitar verificación

```jsx
import { useState } from "react";

export default function App() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const request = async (e) => {
        e.preventDefault();
        setMessage("Enviando enlace de verificación...");
        try {
            const res = await fetch(
                "http://localhost:3001/request-verification",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                }
            );
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Error desconocido");
            setMessage("Enlace enviado. Revisá tu correo y hace click en él.");
        } catch (err) {
            setMessage("Error: " + err.message);
        }
    };

    return (
        <div
            style={{
                maxWidth: 720,
                margin: "2rem auto",
                fontFamily: "sans-serif",
            }}
        >
            <h1>Verificación por enlace — Demo</h1>
            <form onSubmit={request}>
                <label>Correo electrónico:</label>
                <br />
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ width: "100%" }}
                />
                <br />
                <br />
                <button type="submit">Enviar enlace de verificación</button>
            </form>
            {message && (
                <p>
                    <strong>Estado:</strong> {message}
                </p>
            )}
        </div>
    );
}
```

### 3) `src/Verified.jsx` — página que recibe el resultado y lo muestra

```jsx
import { useEffect, useState } from "react";

export default function Verified() {
    const [status, setStatus] = useState(null);
    const [email, setEmail] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setStatus(params.get("status"));
        setEmail(params.get("email"));
    }, []);

    if (!status) return null;

    if (status === "success") {
        return (
            <div style={{ maxWidth: 720, margin: "2rem auto" }}>
                <h1>¡Verificación exitosa! ✅</h1>
                <p>
                    Correo verificado: <strong>{email}</strong>
                </p>
            </div>
        );
    }

    if (status === "expired") {
        return (
            <div style={{ maxWidth: 720, margin: "2rem auto" }}>
                <h1>Enlace expirado ⌛</h1>
                <p>Solicitá uno nuevo desde la página principal.</p>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: 720, margin: "2rem auto" }}>
            <h1>Enlace inválido ❌</h1>
            <p>
                Verificá que hayas usado el enlace correcto o solicitá uno
                nuevo.
            </p>
        </div>
    );
}
```

### 4) Ruteo simple en `src/main.jsx`

```jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import Verified from "./Verified";

function Router() {
    const path = window.location.pathname;
    if (path.startsWith("/verified")) return <Verified />;
    return <App />;
}

createRoot(document.getElementById("root")).render(<Router />);
```

---

## Ejecución (desarrollo)

1. Backend:

    - Configurar `backend/.env`
    - `cd backend`
    - `node server.js` (o `npm start`)

2. Frontend:

    - `cd frontend`
    - `npm install`
    - `npm run dev`
    - Abrir la URL que Vite muestre (ej: `http://localhost:5173`)

3. Probar:
    - Ingresar un email controlado en la app.
    - Abrir el correo, hacer click en el enlace.
    - Deberías ver la página `/verified?status=success` en el frontend.

---

## Consideraciones de seguridad y mejoras (importante)

-   **Tokens únicos y difíciles de adivinar**: usar UUIDs o tokens criptográficos (no usar valores predecibles).
-   **HTTPS**: en producción enviar enlaces con `https://`.
-   **Un solo uso**: eliminar token tras validación (hecho en el ejemplo).
-   **Expiración corta**: mantener expiración (ej: 10–15 minutos).
-   **No exponer información sensible en la URL**: evitar poner datos sensibles en query string. Aquí usamos `email` solo para UX; es mejor no incluirlo o en su lugar pasar un estado no sensible.
-   **Hashing de tokens en almacenamiento**: considerar guardar `hash(token)` en vez de token plano si la persistencia es accesible por terceros.
-   **Limitar solicitudes**: rate limiting por IP/email para evitar abuso.
-   **Protección antiphishing / autenticidad**: añade enlaces con dominio propio y firma DKIM para mejorar entregabilidad.
-   **Reenvío, bloqueo de intentos**: implementar contador de intentos y reenvío controlado.

---

## Extensiones posibles

-   Validar token mediante backend y devolver un JWT para iniciar sesión automáticamente.
-   Usar Redis para almacenar tokens con TTL en lugar de un JSON plano.
-   Registrar auditoría: cuándo se generó el token, IP solicitante, cuándo se verificó.

---

## Pruebas rápidas

1. Levantá backend y frontend.
2. Solicitá verificación con un email que controles.
3. Hacé click en el enlace del correo.
4. Observá la página de resultado (success/expired/invalid).
