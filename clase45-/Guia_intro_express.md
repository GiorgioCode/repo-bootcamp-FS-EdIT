# Guía de Express.js: El Framework Web para Node.js

## ¿Qué es Express.js?

Express.js es un framework web rápido, minimalista y flexible para Node.js que simplifica el desarrollo de aplicaciones web y APIs. Es uno de los frameworks más populares en el ecosistema de Node.js y sirve como base para muchos otros frameworks.

## Características Principales

1. **Minimalista**: Ligero y sin capas innecesarias, permitiendo mayor flexibilidad.
2. **Middleware**: Sistema de middleware integrado para manejar peticiones y respuestas HTTP.
3. **Enrutamiento**: Sistema de enrutamiento robusto con soporte para parámetros y expresiones regulares.
4. **Plantillas**: Soporte para múltiples motores de plantillas como EJS, Pug, y Handlebars.
5. **RESTful**: Ideal para crear APIs RESTful de manera sencilla.
6. **Compatible**: Funciona con cualquier base de datos (MongoDB, PostgreSQL, MySQL, etc.).

## Ventajas de Usar Express

- **Rápido desarrollo**: Permite crear aplicaciones web rápidamente.
- **Gran comunidad**: Amplia documentación y soporte de la comunidad.
- **Middleware**: Ecosistema rico de middleware disponible.
- **Escalable**: Fácil de escalar para aplicaciones grandes.
- **Flexible**: No impone una estructura rígida de proyecto.

## Conceptos Clave

### 1. Aplicación Express
El objeto principal de Express que maneja la configuración y el enrutamiento.

### 2. Middleware
Funciones que tienen acceso al objeto de solicitud (`req`), al objeto de respuesta (`res`) y a la siguiente función de middleware en el ciclo de solicitud/respuestas.

### 3. Enrutamiento
Define cómo responde la aplicación a las solicitudes del cliente en un punto final específico (URI) y un método HTTP específico (GET, POST, etc.).

### 4. Parámetros
- **Query Params**: `http://ejemplo.com/api/usuarios?nombre=juan`
- **Route Params**: `/usuarios/:id`
- **Request Body**: Datos enviados en el cuerpo de la petición (POST, PUT, PATCH)

## Instalación

Para usar Express en tu proyecto, primero instálalo con npm:

```bash
# Crear un nuevo proyecto Node.js (si no lo has hecho)
npm init -y

# Instalar Express
npm install express
```

## Ejemplo Básico

```javascript
// Importar Express
const express = require('express');

// Crear una aplicación Express
const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta de ejemplo
app.get('/', (req, res) => {
    res.send('¡Bienvenido a mi aplicación Express!');
});

// Ruta con parámetros
app.get('/saludo/:nombre', (req, res) => {
    const { nombre } = req.params;
    res.json({ mensaje: `¡Hola, ${nombre}!` });
});

// Ruta POST para crear un recurso
app.post('/usuarios', (req, res) => {
    const { nombre, email } = req.body;
    // Aquí iría la lógica para guardar en la base de datos
    res.status(201).json({ id: 1, nombre, email });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
});
```

## Middleware Comunes

### 1. `express.json()`
```javascript
app.use(express.json());
```
Permite parsear el cuerpo de las peticiones con formato JSON.

### 2. `express.urlencoded()`
```javascript
app.use(express.urlencoded({ extended: true }));
```
Permite parsear datos de formularios HTML.

### 3. `express.static()`
```javascript
app.use(express.static('public'));
```
Sirve archivos estáticos (HTML, CSS, imágenes) desde el directorio especificado.

## Estructura de Directorios Recomendada

```
mi-proyecto/
├── node_modules/
├── public/
│   ├── css/
│   ├── js/
│   └── images/
├── routes/
│   ├── usuarios.js
│   └── productos.js
├── controllers/
│   ├── usuariosController.js
│   └── productosController.js
├── models/
│   ├── Usuario.js
│   └── Producto.js
├── .env
├── app.js
└── package.json
```

## Middleware de Terceros Útiles

1. **CORS**: Permite peticiones de diferentes orígenes
   ```bash
   npm install cors
   ```
   ```javascript
   const cors = require('cors');
   app.use(cors());
   ```

2. **Helmet**: Ayuda a proteger tu aplicación de vulnerabilidades web
   ```bash
   npm install helmet
   ```
   ```javascript
   const helmet = require('helmet');
   app.use(helmet());
   ```

3. **Morgan**: Logger de solicitudes HTTP
   ```bash
   npm install morgan
   ```
   ```javascript
   const morgan = require('morgan');
   app.use(morgan('dev'));
   ```

## Buenas Prácticas

1. **Manejo de Errores**: Usa middleware para manejo centralizado de errores.
2. **Variables de Entorno**: Usa el paquete `dotenv` para manejar configuraciones sensibles.
3. **Validación**: Valida siempre los datos de entrada (usando librerías como Joi o express-validator).
4. **Seguridad**: Implementa medidas de seguridad básicas (helmet, rate limiting, CORS).
5. **Logging**: Registra las solicitudes y errores para facilitar el debugging.

## Recursos Adicionales

- [Documentación Oficial de Express](https://expressjs.com/)
- [Guía de Express en MDN](https://developer.mozilla.org/es/docs/Learn/Server-side/Express_Nodejs)
- [Awesome Express](https://github.com/rajikaimal/awesome-express) - Recursos útiles para Express

## Conclusión

Express.js es una herramienta poderosa para el desarrollo de aplicaciones web y APIs en Node.js. Su simplicidad y flexibilidad lo convierten en una excelente opción tanto para principiantes como para desarrolladores experimentados. Con un ecosistema rico en middleware y una gran comunidad, Express facilita la creación de aplicaciones robustas y escalables.
