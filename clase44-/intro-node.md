# Guía Básica de Node.js para Desarrolladores Frontend

## ¿Qué es Node.js?

Node.js es un entorno de ejecución de JavaScript del lado del servidor que se basa en el motor V8 de Google Chrome. A diferencia del navegador, donde JavaScript se ejecuta en el contexto de la página web, Node.js permite ejecutar JavaScript directamente en el sistema operativo.

## Diferencias Clave: Frontend JS vs Node.js

### 1. Entorno de Ejecución
- **Frontend JS**: Se ejecuta en el navegador del usuario.
- **Node.js**: Se ejecuta en el servidor o en tu máquina local.

### 2. Objetos Globales
- **Frontend JS**: Tiene acceso a objetos como `window`, `document`, `localStorage`.
- **Node.js**: No tiene acceso a los objetos del navegador, pero tiene sus propios objetos globales como `process`, `__dirname`, `__filename`.

### 3. Módulos
- **Frontend JS**: Usa `import/export` (ES Modules) o `require/module.exports` (CommonJS) con bundlers como webpack.
- **Node.js**: Originalmente usaba CommonJS (`require/module.exports`), pero ahora también soporta ES Modules.

### 4. Operaciones de E/S
- **Frontend JS**: Limitado por el sandbox del navegador. No puede acceder directamente al sistema de archivos.
- **Node.js**: Puede leer/escribir archivos directamente en el sistema operativo.

## Instalación

1. Descarga Node.js desde [nodejs.org](https://nodejs.org/)
2. Verifica la instalación:
   ```bash
   node --version
   npm --version
   ```

## Tu Primer Programa

Crea un archivo llamado `hola.js`:

```javascript
// Esto es similar a console.log() en el navegador
console.log('¡Hola desde Node.js!');

// Accediendo a variables globales de Node
console.log(`Directorio actual: ${__dirname}`);
console.log(`Ruta del archivo: ${__filename}`);
```

Ejecútalo con:
```bash
node hola.js
```

## Módulos Básicos

### Módulo FS (File System)

```javascript
const fs = require('fs');

// Leer un archivo
fs.readFile('archivo.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Escribir en un archivo
fs.writeFile('nuevo-archivo.txt', 'Contenido de ejemplo', (err) => {
  if (err) throw err;
  console.log('Archivo guardado!');
});
```

### Módulo HTTP

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('¡Hola desde el servidor Node.js!');
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Servidor ejecutándose en http://127.0.0.1:3000/');
});
```

## Gestión de Paquetes con npm

- Inicializar un proyecto:
  ```bash
  npm init -y
  ```

- Instalar un paquete:
  ```bash
  npm install nombre-del-paquete
  ```

- Instalar como dependencia de desarrollo:
  ```bash
  npm install --save-dev nombre-del-paquete
  ```

## Asincronía en Node.js

Node.js es no bloqueante y orientado a eventos. Aquí hay un ejemplo de cómo funciona la asincronía:

```javascript
console.log('Inicio');

// setTimeout es asíncrono
setTimeout(() => {
  console.log('Esto se ejecutará después de 1 segundo');
}, 1000);

console.log('Fin');
```

## Variables de Entorno

Crea un archivo `.env` en la raíz de tu proyecto:
```
DB_HOST=localhost
DB_USER=usuario
DB_PASS=contraseña
```

Instala el paquete dotenv:
```bash
npm install dotenv
```

Úsalo en tu aplicación:
```javascript
require('dotenv').config();

console.log(process.env.DB_HOST); // localhost
```

## Buenas Prácticas

1. Usa `const` y `let` en lugar de `var`
2. Maneja siempre los errores en callbacks
3. Usa promesas o async/await para código asíncrono
4. Mantén tus dependencias actualizadas
5. Usa `.gitignore` para excluir `node_modules/` y archivos sensibles

## Siguientes Pasos

1. Explora frameworks como Express.js para crear APIs REST
2. Aprende sobre bases de datos (MongoDB, PostgreSQL)
3. Descubre cómo manejar autenticación con JWT
4. Aprende sobre pruebas unitarias con Jest o Mocha
5. Explora la creación de aplicaciones en tiempo real con Socket.io

## Recursos Adicionales

- [Documentación oficial de Node.js](https://nodejs.org/es/docs/)
- [Node.js Design Patterns](https://www.patterns.dev/posts/nodejs-design-patterns/)
- [The Node.js Way](https://blog.risingstack.com/node-js-best-practices/)
