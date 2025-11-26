# 📧 Sistema de Envío de Correos con Nodemailer

Sistema completo de envío de correos electrónicos desarrollado con **Node.js/Express** en el backend y **React/Vite** en el frontend.

## ✨ Características

- 🚀 Backend con Express y Nodemailer
- ⚛️ Frontend moderno con React y Vite
- 🎨 Diseño hermoso con animaciones suaves
- 📱 Totalmente responsivo
- ✉️ Integración con Gmail SMTP
- 🔒 Variables de entorno seguras
- ⚡ Validación de formularios
- 💫 Estados de carga y retroalimentación

## 📋 Requisitos Previos

- Node.js >= 16
- npm o yarn
- Cuenta de Gmail con contraseña de aplicación

## 🛠️ Configuración

### 1. Obtener Contraseña de Aplicación de Gmail

1. Ve a tu [Cuenta de Google](https://myaccount.google.com/)
2. Navega a **Seguridad**
3. Activa la **Verificación en 2 pasos**
4. Busca **Contraseñas de aplicaciones**
5. Genera una nueva contraseña para "Correo"
6. Guarda la contraseña generada (16 caracteres)

### 2. Configurar Backend

```bash
cd backend
npm install
```

Crea un archivo `.env` en la carpeta `backend/` (usa `.env.example` como referencia):

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-email@gmail.com
SMTP_PASS=xxxx-xxxx-xxxx-xxxx
FROM_EMAIL=tu-email@gmail.com
PORT=3001
```

> ⚠️ **IMPORTANTE**: Reemplaza `tu-email@gmail.com` con tu correo real y `xxxx-xxxx-xxxx-xxxx` con la contraseña de aplicación de Gmail.

### 3. Configurar Frontend

```bash
cd frontend
npm install
```

## 🚀 Ejecutar el Proyecto

### Iniciar Backend

```bash
cd backend
npm start
```

El servidor backend estará disponible en `http://localhost:3001`

### Iniciar Frontend

En otra terminal:

```bash
cd frontend
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

## 📁 Estructura del Proyecto

```
MAILER/
├── backend/
│   ├── server.js           # Servidor Express con Nodemailer
│   ├── package.json        # Dependencias del backend
│   ├── .env.example        # Plantilla de variables de entorno
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # Componente principal con formulario
│   │   ├── App.css         # Estilos modernos y animaciones
│   │   └── main.jsx        # Punto de entrada
│   ├── package.json        # Dependencias del frontend
│   └── index.html
│
└── guia_nodemailer.md      # Guía de referencia
```

## 🎯 Uso

1. Asegúrate de que tanto el backend como el frontend estén ejecutándose
2. Abre `http://localhost:5173` en tu navegador
3. Completa el formulario:
   - **Destinatario**: Email del receptor
   - **Asunto**: Asunto del correo
   - **Mensaje**: Contenido del correo
4. Haz clic en **Enviar Correo**
5. Espera la confirmación de envío exitoso

## 🔧 API Backend

### POST `/send-email`

Envía un correo electrónico.

**Request Body:**
```json
{
  "to": "destinatario@example.com",
  "subject": "Asunto del correo",
  "text": "Contenido del mensaje"
}
```

**Response Success (200):**
```json
{
  "message": "Correo enviado",
  "messageId": "<id-del-mensaje>"
}
```

**Response Error (400/500):**
```json
{
  "error": "Descripción del error",
  "details": "Detalles adicionales"
}
```

## 🛡️ Seguridad

- ✅ No subas el archivo `.env` al repositorio
- ✅ Usa contraseñas de aplicación, no tu contraseña real de Gmail
- ✅ Activa la verificación en 2 pasos en tu cuenta de Google
- ✅ En producción, añade autenticación al endpoint `/send-email`
- ✅ Considera usar servicios de correo transaccional (SendGrid, Mailgun) en producción

## 🐛 Solución de Problemas

### Error de autenticación (535)
- Verifica que `SMTP_USER` y `SMTP_PASS` sean correctos
- Asegúrate de usar una contraseña de aplicación, no tu contraseña de Gmail
- Confirma que la verificación en 2 pasos esté activada

### Error de conexión
- Verifica que `SMTP_HOST` sea `smtp.gmail.com`
- Verifica que `SMTP_PORT` sea `587` o `465`
- Revisa tu firewall y conexión a internet

### El correo va a spam
- Verifica que el remitente sea válido
- Considera usar servicios de correo transaccional
- Configura SPF, DKIM y DMARC en tu dominio

### CORS Error
- Asegúrate de que el backend esté ejecutándose en el puerto 3001
- Verifica que el frontend esté haciendo peticiones a `http://localhost:3001`

## 📚 Tecnologías Utilizadas

### Backend
- Express.js - Framework web
- Nodemailer - Librería de envío de correos
- dotenv - Manejo de variables de entorno
- cors - Middleware para CORS

### Frontend
- React - Librería UI
- Vite - Build tool y dev server
- CSS moderno con gradientes y animaciones

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👨‍💻 Desarrollado por

Proyecto educativo desarrollado como ejemplo de integración Nodemailer + React

---

**¿Necesitas ayuda?** Consulta la [guía oficial de Nodemailer](https://nodemailer.com/)
