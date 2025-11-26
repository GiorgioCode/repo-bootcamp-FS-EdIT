# 🚀 Guía Rápida de Inicio

## Pasos para Ejecutar el Proyecto

### 1️⃣ Configurar Backend

```bash
cd backend
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales de Gmail:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-email@gmail.com
SMTP_PASS=xxxx-xxxx-xxxx-xxxx
FROM_EMAIL=tu-email@gmail.com
PORT=3001
```

> ⚠️ **IMPORTANTE**: Debes obtener una **contraseña de aplicación** de Gmail:
> 
> 1. Ve a https://myaccount.google.com/security
> 2. Activa la verificación en 2 pasos
> 3. Busca "Contraseñas de aplicaciones"
> 4. Genera una para "Correo"
> 5. Usa esa contraseña (16 caracteres) en `SMTP_PASS`

### 2️⃣ Iniciar Backend

```bash
npm start
```

Deberías ver:
```
✅ SMTP configurado correctamente
🚀 Backend escuchando en http://localhost:3001
```

### 3️⃣ Iniciar Frontend (en otra terminal)

```bash
cd ../frontend
npm run dev
```

### 4️⃣ Usar la Aplicación

1. Abre http://localhost:5173 en tu navegador
2. Completa el formulario
3. Envía un correo de prueba

## ❓ Problemas Comunes

**Error 535 (Autenticación)**
- Verifica que estés usando una contraseña de aplicación, no tu contraseña real
- Confirma que la verificación en 2 pasos esté activada

**Error de conexión**
- Verifica que ambos servidores estén corriendo
- Revisa que los puertos 3001 y 5173 estén libres

**CORS Error**
- Asegúrate de que el backend esté en el puerto 3001
- El frontend debe apuntar a http://localhost:3001

## 📚 Más Información

Consulta el [README.md](README.md) para documentación completa.
