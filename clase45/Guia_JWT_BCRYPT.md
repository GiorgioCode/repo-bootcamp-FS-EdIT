# Guía paso a paso: API REST sencilla con JWT y bcrypt (Node.js, JavaScript)

**Objetivo:** crear una API REST minimalista con Node.js que permita autenticación mediante **JWT** (JSON Web Tokens) y encriptación de contraseñas con **bcrypt**. La guía explica todo paso a paso y está pensada para personas sin experiencia previa.

---

## Índice

1. ¿Qué es JWT y para qué sirve?
2. ¿Qué es bcrypt y por qué usarlo?
3. Requisitos previos
4. Estructura del proyecto
5. Configuración del proyecto (instalación y variables de entorno)
6. Código completo (archivo por archivo) — con comentarios línea por línea
7. Ejecutar la API
8. Pruebas en Postman (paso a paso)
9. Buenas prácticas y próximos pasos

---

## 1) ¿Qué es JWT y para qué sirve?

-   **JWT (JSON Web Token)** es un estándar para representar declaraciones (claims) entre dos partes.
-   En una API, se usa normalmente para **autenticar** solicitudes: cuando un usuario inicia sesión, el servidor le entrega un token. Ese token lo presenta el cliente en solicitudes posteriores para demostrar que está autenticado.
-   Un JWT está formado por 3 partes codificadas en base64: **header**, **payload** y **signature**. La firma permite verificar que el token fue emitido por el servidor y no fue alterado.

**Flujo típico:**

1. Usuario envía credenciales (email/usuario + contraseña).
2. El servidor valida las credenciales.
3. Si son correctas, el servidor crea un JWT firmado y lo devuelve al cliente.
4. El cliente guarda el token (ej. en memoria, localStorage o similar) y lo envía en el header `Authorization: Bearer <token>` en futuras peticiones.
5. El servidor verifica la firma y, si es válida, permite el acceso a rutas protegidas.

---

## 2) ¿Qué es bcrypt y por qué usarlo?

-   **bcrypt** es una librería para hashear (encriptar de forma unidireccional) contraseñas.
-   No debes guardar contraseñas en texto plano. En cambio, guardas el _hash_ generado por bcrypt.
-   Cuando un usuario intenta iniciar sesión, en lugar de comparar contraseñas, comparas el hash almacenado con el hash de la contraseña ingresada (bcrypt hace esta comparación de forma segura).

**Por qué bcrypt:** incluye un factor de trabajo (salt rounds) que hace que generar hashes consuma tiempo, dificultando ataques por fuerza bruta.

---

## 3) Requisitos previos

-   Node.js (versión 16 o superior recomendada).
-   npm o yarn.
-   Postman para probar la API.
-   Conocimientos básicos de terminal (ejecutar `cd`, instalar paquetes, etc.).

---

## 4) Estructura del proyecto

Vamos a crear una estructura simple:

```
jwt-bcrypt-demo/
├─ node_modules/
├─ .env
├─ .gitignore
├─ package.json
├─ index.js          # archivo principal del servidor
├─ routes/
│  ├─ auth.js        # rutas de registro e inicio de sesión
│  └─ protected.js   # ruta protegida que requiere JWT
└─ middleware/
   └─ verifyToken.js # middleware para validar JWT
```

---

## 5) Configuración del proyecto (instalación y variables de entorno)

1. Crea una carpeta y accede a ella:

```bash
mkdir jwt-bcrypt-demo
cd jwt-bcrypt-demo
```

2. Inicializa npm:

```bash
npm init -y
```

3. Instala dependencias necesarias:

```bash
npm install express jsonwebtoken bcrypt dotenv
```

-   `express` → framework web.
-   `jsonwebtoken` → para crear/verificar JWT.
-   `bcrypt` → para hashear contraseñas.
-   `dotenv` → para leer variables de entorno desde `.env`.

4. Crea un archivo `.env` en la raíz con estas variables de ejemplo:

```
PORT=3000
JWT_SECRET=mi_clave_secreta_muy_segura
JWT_EXPIRES_IN=1h
BCRYPT_SALT_ROUNDS=10
```

**Notas:**

-   `JWT_SECRET` debe ser una cadena larga y secreta. En producción usa un secreto fuerte.
-   `JWT_EXPIRES_IN` define cuánto dura el token (ej. `1h` = 1 hora).
-   `BCRYPT_SALT_ROUNDS` define la complejidad del hash (10 es razonable para pruebas locales).

5. Crea `.gitignore` y agrega:

```
node_modules
.env
```

---

## 6) ¿Cómo funciona JWT — explicación paso a paso (detallado segun proyecto)

A continuación se explica con detalle cada fase del ciclo de vida de un token JWT en el contexto de nuestra API. La idea es que cualquiera que no conozca estas tecnologías pueda entender qué ocurre en cada momento.

1. **Registro del usuario (signup)**

    - El usuario envía su `email` y `password` al servidor (ruta `/api/auth/register`).
    - Antes de almacenar la contraseña, el servidor aplica `bcrypt.hash(password, saltRounds)` para obtener un **hash** seguro.
    - Se guarda en la "base de datos" (en nuestro ejemplo, un array en memoria) el `email` y el `passwordHash`. Nunca se almacena la contraseña en texto plano.

2. **Inicio de sesión (login)**

    - El usuario envía `email` y `password` a la ruta `/api/auth/login`.
    - El servidor recupera el `passwordHash` asociado al `email` (si existe).
    - El servidor llama a `bcrypt.compare(password, passwordHash)` para comprobar si la contraseña es correcta. `bcrypt.compare` es seguro y maneja la comparación con el salt الداخلي.
    - Si la contraseña es correcta, el servidor **genera un JWT** usando `jwt.sign(payload, secret, { expiresIn })`.
        - **Payload**: contiene datos mínimos del usuario (por ejemplo `id` y `email`). No pongas secretos ni contraseñas aquí.
        - **Secret**: una clave secreta almacenada en el servidor (`JWT_SECRET`) que se usa para firmar el token. Quien firme el token con esa clave puede crear tokens válidos; por eso es secreto.
        - **expiresIn**: duración del token (ej. `1h`) para evitar que un token robado sea válido indefinidamente.
    - El servidor devuelve el `token` al cliente en la respuesta.

3. **Almacenamiento del token en el cliente**

    - El cliente (Postman, navegador, app móvil) guarda el token. En entornos de navegador se debe tener cuidado: **no** es recomendable guardar tokens sensibles en `localStorage` sin medidas extra; para el ejemplo pedagógico, Postman solo lo mantiene en memoria entre peticiones.

4. **Realizar peticiones a rutas protegidas**

    - Para acceder a una ruta protegida (ej. `/api/protected/secret`) el cliente agrega el header: `Authorization: Bearer <token>`.
    - El servidor recibe la petición y ejecuta un middleware que extrae el token del header.
    - El middleware llama a `jwt.verify(token, secret, callback)`:
        - Si la verificación falla (token inválido, modificado o expirado), la petición se rechaza con 401.
        - Si la verificación es correcta, `jwt.verify` devuelve el contenido decodificado del payload (por ejemplo `{ id, email, iat, exp }`).
    - El middleware pone esos datos en `req.user` y la petición continúa hacia la ruta protegida, que puede usar `req.user` para decisiones de autorización.

5. **Consideraciones de seguridad importantes**
    - **Nunca** incluyas información sensible (por ejemplo contraseñas) en el payload del JWT. Cualquiera con el token puede decodificar la parte `payload` (porque está en base64) y leerla; la seguridad viene de la firma, no del ocultamiento.
    - **Firma vs. cifrado:** Un JWT firmado garantiza integridad (no fue modificado) y autenticidad (fue creado por quien tiene la clave). No cifra los datos: si necesitas confidencialidad, cifra los datos o usa JWT cifrados (JWE) u otro mecanismo.
    - **Expiración:** siempre define tiempos de expiración para limitar el impacto de un token robado.
    - **Revocación:** JWTs firmados no son fáciles de revocar individualmente sin mantener una lista en el servidor (blacklist) o usar tokens cortos y refresh tokens.

---

Ver diagrama (grafico)

---

## 7) Código completo (archivo por archivo)

A continuación encontrarás los archivos con explicaciones **línea por línea** dentro de los comentarios.

> **Importante:** el código está comentado detalladamente para que cualquiera lo entienda.

### `index.js`

```javascript
// Cargamos la configuración de variables de entorno desde el archivo .env
require("dotenv").config();

// Importamos express que nos permite crear un servidor web y definir rutas
const express = require("express");

// Creamos una instancia de aplicación express
const app = express();

// Importamos el módulo 'auth' y 'protected' donde definiremos nuestras rutas
const authRoutes = require("./routes/auth");
const protectedRoutes = require("./routes/protected");

// Le decimos a express que entienda JSON en el body de las peticiones
app.use(express.json());

// Montamos las rutas de autenticación bajo /api/auth
app.use("/api/auth", authRoutes);

// Montamos las rutas protegidas bajo /api/protected
app.use("/api/protected", protectedRoutes);

// Obtenemos el puerto desde la variable de entorno, si no existe usamos 3000
const PORT = process.env.PORT || 3000;

// Iniciamos el servidor y escuchamos en el puerto definido
app.listen(PORT, () => {
    // Mensaje en consola para saber que el servidor arrancó correctamente
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
```

---

### `middleware/verifyToken.js`

```javascript
// Importamos jsonwebtoken para poder verificar tokens
const jwt = require("jsonwebtoken");

// Middleware que verifica el token enviado en el header Authorization
module.exports = function (req, res, next) {
    // Recuperamos el header 'authorization' (forma esperada: 'Bearer <token>')
    const authHeader = req.headers["authorization"];

    // Si no hay header devolvemos 401 (no autorizado)
    if (!authHeader)
        return res.status(401).json({ message: "No token provided" });

    // El header contiene 'Bearer <token>', separamos por espacio y tomamos la segunda parte
    const parts = authHeader.split(" ");

    // Compruebo que haya dos partes y que la primera parte sea 'Bearer'
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res
            .status(401)
            .json({ message: "Invalid authorization header format" });
    }

    const token = parts[1];

    // Verificamos el token con la clave secreta que definimos en .env
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        // Si hubo un error (token inválido o expirado) devolvemos 401
        if (err) return res.status(401).json({ message: "Invalid token" });

        // Guardamos los datos decodificados en la petición para que las rutas puedan usarlos
        req.user = decoded;

        // Llamamos a next() para que la petición continúe al siguiente middleware / ruta
        next();
    });
};
```

---

### `routes/auth.js`

> Para simplicidad usaremos una "base de datos" en memoria (un array). **No** es persistente ni para producción; solo para aprender.

```javascript
// Importamos express para crear un router
const express = require("express");
const router = express.Router();

// Importamos bcrypt para encriptar contraseñas y jsonwebtoken para crear tokens
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Array que simula una base de datos de usuarios en memoria
// Cada usuario tendrá: id, email, passwordHash
const users = [];

// Ruta: POST /api/auth/register
// Registra un usuario nuevo (recibe { email, password })
router.post("/register", async (req, res) => {
    try {
        // Leemos email y password desde el body de la petición
        const { email, password } = req.body;

        // Validación básica: comprobar que haya email y password
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required" });
        }

        // Verificamos si el usuario ya existe en el array
        const existing = users.find((u) => u.email === email);
        if (existing) {
            return res.status(400).json({ message: "User already exists" });
        }

        // GENERAMOS EL HASH de la contraseña usando bcrypt
        // parseInt(process.env.BCRYPT_SALT_ROUNDS) convierte la variable de entorno a número
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;

        // bcrypt.hash devuelve una promesa, por eso usamos await
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // Creamos el usuario y lo guardamos en el array
        const user = { id: users.length + 1, email, passwordHash };
        users.push(user);

        // Respondemos con éxito (sin devolver la contraseña ni el hash)
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        // En caso de error devolvemos 500
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Ruta: POST /api/auth/login
// Inicia sesión y devuelve un JWT si las credenciales son correctas
router.post("/login", async (req, res) => {
    try {
        // Leemos email y password del body
        const { email, password } = req.body;

        // Validación básica
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required" });
        }

        // Buscamos el usuario por email
        const user = users.find((u) => u.email === email);
        if (!user) {
            // Para no revelar si el email existe, podemos devolver un mensaje genérico
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Comparamos la contraseña enviada con el hash almacenado
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Si es correcta, generamos un JWT. En el payload podemos guardar información mínima
        const payload = {
            id: user.id,
            email: user.email,
        };

        // Firmamos el token con nuestra clave secreta y tiempo de expiración desde .env
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || "1h",
        });

        // Enviamos el token al cliente
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
```

---

### `routes/protected.js`

```javascript
// Importamos express para crear un router
const express = require("express");
const router = express.Router();

// Importamos el middleware que verifica tokens
const verifyToken = require("../middleware/verifyToken");

// Ruta protegida: GET /api/protected/secret
// Solo accesible si se envía un JWT válido en el header Authorization
router.get("/secret", verifyToken, (req, res) => {
    // req.user fue definido por el middleware verifyToken (contiene info del token)
    res.json({ message: "Este es el contenido secreto", user: req.user });
});

module.exports = router;
```

---

## 8) Ejecutar la API

1. Asegúrate de tener el archivo `.env` con las variables explicadas.
2. Desde la carpeta del proyecto instala dependencias si no lo hiciste: `npm install`.
3. Ejecuta el servidor:

```bash
node index.js
```

4. Deberías ver en la consola: `Servidor escuchando en http://localhost:3000` (o el puerto que hayas configurado).

---

## 9) Pruebas en Postman (paso a paso)

A continuación se detallan las pruebas que debes realizar en Postman para verificar el funcionamiento.

### 9.1 Registro de usuario

-   Método: **POST**
-   URL: `http://localhost:3000/api/auth/register`
-   Body → raw → JSON:

```json
{
    "email": "alumno@example.com",
    "password": "contraseña123"
}
```

**Resultado esperado:** 201 Created y mensaje `User registered successfully`.

### 9.2 Login (obtener JWT)

-   Método: **POST**
-   URL: `http://localhost:3000/api/auth/login`
-   Body → raw → JSON:

```json
{
    "email": "alumno@example.com",
    "password": "contraseña123"
}
```

**Resultado esperado:** 200 OK con un JSON que contiene `token`.

**Copia** el valor del `token` para usarlo en la siguiente prueba.

### 9.3 Acceder a ruta protegida

-   Método: **GET**
-   URL: `http://localhost:3000/api/protected/secret`
-   Headers:
    -   `Authorization: Bearer <token>` (pega el token obtenido en el paso anterior)

**Resultado esperado:** 200 OK con el objeto JSON `{ message: 'Este es el contenido secreto', user: { id, email, iat, exp } }`.

### Casos de prueba adicionales:

-   Intentar la ruta protegida sin enviar `Authorization` → debe devolver 401.
-   Enviar un token inválido o modificado → 401.
-   Probar login con contraseña incorrecta → 400 `Invalid credentials`.

---

## 10) Buenas prácticas y próximos pasos

-   **No guardar secretos en .env** si vas a compartir el repositorio. Usa servicios de gestión de secretos (Vault, AWS Secrets Manager, etc.) en producción.
-   **No uses datos en memoria para producción.** Conecta una base de datos real (MongoDB, PostgreSQL, etc.).
-   **Refrescar tokens:** considera usar refresh tokens para sesiones más seguras y permitir logout.
-   **HTTPS:** en producción, siempre usa HTTPS para que los tokens no viajen en texto claro.
-   **Rate limiting, sanitización de datos y validaciones más estrictas** para evitar abusos y vulnerabilidades.

---

## Archivos de ejemplo (resumen)

-   `index.js` → arranque del servidor y montaje de rutas
-   `routes/auth.js` → registro y login
-   `routes/protected.js` → rutas que requieren autenticación
-   `middleware/verifyToken.js` → valida tokens JWT
-   `.env` → configuración (no subirla a repositorios públicos)

---

## Conclusión

Has creado una API REST en Node.js que usa **bcrypt** para proteger contraseñas y **JWT** para autenticar usuarios y proteger rutas. Con esto tendrás la base para expandir hacia proyectos reales: almacenar usuarios en base de datos, agregar roles, refresher tokens, etc.
