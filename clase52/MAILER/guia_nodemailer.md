# Guía imprimible: Uso de **Nodemailer** (Node.js backend) + Frontend React (Vite)

---

## Índice

1. Introducción
2. Requisitos previos
3. Estructura del proyecto
4. Variables de entorno (.env)
5. Backend — Node.js + Express + Nodemailer (paso a paso)
6. Frontend — React (Vite) (paso a paso)
7. Cómo ejecutar (desarrollo)
8. Buenas prácticas y seguridad
9. Solución de problemas común
10. Referencias rápidas

---

## 1. Introducción

Nodemailer es una librería de Node.js para enviar correos electrónicos a través de SMTP y otros mecanismos. Esta guía muestra un ejemplo sencillo y completo que utiliza:

-   Backend: Node.js + Express + Nodemailer
-   Frontend: React con Vite (JavaScript)
-   Uso de variables de entorno para credenciales

El objetivo es aprender la integración básica y cómo enviar un correo desde un formulario en el frontend.

---

## 2. Requisitos previos

-   Node.js (>= 16 recomendado)
-   npm o yarn
-   Cuenta SMTP para pruebas (por ejemplo: Gmail con App Passwords, Mailgun, SendGrid o un servidor SMTP propio)

---

## 3. Estructura del proyecto (sugerida)

```
nodemailer-demo/
├─ backend/
│  ├─ package.json
│  ├─ server.js
│  └─ .env
└─ frontend/
   ├─ package.json
   ├─ index.html
   └─ src/
      └─ App.jsx
      └─ main.jsx
```

---

## 4. Variables de entorno (.env)

Crea un archivo `.env` en la carpeta `backend/` con las siguientes variables **(no subir a repositorios públicos)**:

```
# Ejemplo .env
SMTP_HOST=smtp.example.com
SMTP_PORT=587 -> depende del servicio
SMTP_USER="ejemplo@gmail.com" -> usuario de ejemplo
SMTP_PASS="iunr oiac wr4d 33dv" -> pass de ejemplo estilo gmail
FROM_EMAIL="ejemplo@gmail.com" -> usuario de ejemplo
```

Notas:

-   Para Gmail con contraseña de aplicación: `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=587` o `465`.
-   En producción, utiliza un gestor de secretos o variables en el entorno del servidor.

---

## 5. Backend — Node.js + Express + Nodemailer

### 5.1. Inicializar el proyecto

Desde `nodemailer-demo/backend`:

```bash
npm init -y
npm install express nodemailer dotenv cors
```

### 5.2. `server.js` (archivo principal)

```js
// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Configuración del transporter usando variables de entorno
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465, // true para 465, false para otros
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// Verificación opcional del transporter
transporter
    .verify()
    .then(() => console.log("SMTP configurado correctamente"))
    .catch((err) => console.error("Error verificando SMTP:", err.message));

app.post("/send-email", async (req, res) => {
    const { to, subject, text, html } = req.body;

    if (!to || !subject || (!text && !html)) {
        return res
            .status(400)
            .json({
                error: "Faltan campos obligatorios: to, subject, text|html",
            });
    }

    try {
        const info = await transporter.sendMail({
            from: process.env.FROM_EMAIL,
            to,
            subject,
            text,
            html,
        });
        return res.json({
            message: "Correo enviado",
            messageId: info.messageId,
        });
    } catch (err) {
        console.error("Error enviando correo:", err);
        return res
            .status(500)
            .json({ error: "Error enviando correo", details: err.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
    console.log(`Backend escuchando en http://localhost:${PORT}`)
);
```

### 5.3. Notas importantes en backend

-   `transporter.verify()` ayuda a detectar problemas con las credenciales o la conexión SMTP.
-   Maneja errores y no expongas trazas completas en producción.
-   Limita las peticiones (rate limiting) si el endpoint queda público.

---

## 6. Frontend — React (Vite) con JavaScript

### 6.1. Crear proyecto Vite

Desde `nodemailer-demo/frontend`:

```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
```

(En ocasiones el comando es `npm create vite@latest . -- --template react`)

### 6.2. `src/App.jsx` (componente simple con formulario)

```jsx
// src/App.jsx
import { useState } from "react";

export default function App() {
    const [to, setTo] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [status, setStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Enviando...");
        try {
            const res = await fetch("http://localhost:3001/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    to,
                    subject,
                    text: body,
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Error desconocido");
            setStatus("Enviado correctamente. ID: " + (data.messageId || ""));
        } catch (err) {
            setStatus("Error: " + err.message);
        }
    };

    return (
        <div
            style={{
                maxWidth: 640,
                margin: "2rem auto",
                fontFamily: "sans-serif",
            }}
        >
            <h1>Enviar correo (demo)</h1>
            <form onSubmit={handleSubmit}>
                <label>Para (to):</label>
                <br />
                <input
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    required
                    style={{ width: "100%" }}
                />
                <br />
                <br />

                <label>Asunto:</label>
                <br />
                <input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    style={{ width: "100%" }}
                />
                <br />
                <br />

                <label>Mensaje:</label>
                <br />
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                    style={{ width: "100%", height: 120 }}
                ></textarea>
                <br />
                <br />

                <button type="submit">Enviar</button>
            </form>

            {status && (
                <p>
                    <strong>Estado:</strong> {status}
                </p>
            )}
        </div>
    );
}
```

### 6.3. Cors y configuración

-   El backend en el ejemplo usa `cors()` de forma amplia. En producción restringe el origen:

```js
app.use(cors({ origin: "https://tu-dominio.com" }));
```

---

## 7. Cómo ejecutar (desarrollo)

1. Backend:

    - Ir a `nodemailer-demo/backend`
    - Crear `.env` con las variables indicadas
    - `node server.js` (o `npm run start` si agregas script en `package.json`)
    - Verificar que `SMTP configurado correctamente` aparezca en consola

2. Frontend:
    - Ir a `nodemailer-demo/frontend`
    - `npm install`
    - `npm run dev` (Vite)
    - Abrir `http://localhost:5173` (o la URL que Vite muestre)

Prueba enviando un correo desde el formulario.

---

## 8. Buenas prácticas y seguridad

-   Nunca guardes credenciales en el repositorio. Usa variables de entorno, servicios de secretos o vault.
-   Usa TLS (puerto 465 o STARTTLS en 587) siempre que sea posible.
-   Para cuentas Gmail, utiliza contraseñas de aplicación (App Passwords) y habilita 2FA.
-   En producción, agrega autenticación y autorización en el endpoint `/send-email` para evitar abuso.
-   Considera usar servicios de correo transaccional (SendGrid, Mailgun, SparkPost) que manejan entregabilidad y escalado.
-   Añade validación y sanitización del contenido del correo para evitar inyección.

---

## 9. Solución de problemas común

-   **Error de autenticación (535)**: revisa `SMTP_USER` y `SMTP_PASS`. Para Gmail, usa App Password.
-   **Conexión rechazada / timeout**: revisa `SMTP_HOST`, `SMTP_PORT` y configuración de firewall.
-   **Correo enviado pero va a spam**: añade encabezados correctos, usa DKIM/SPF en el dominio y servicios reputados.
-   **`transporter.verify()` falla**: imprime `err` para ver detalles. A veces el proveedor requiere TLS/SSL distinto.

---

## 10. Referencias rápidas

-   Nodemailer: https://nodemailer.com/
-   Express: https://expressjs.com/
-   Vite: https://vitejs.dev/
-   Recomendación: Usa servicios de correo para producción (SendGrid, Mailgun, Amazon SES).

---
