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
