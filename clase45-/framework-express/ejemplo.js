// Importamos
const express = require("express");

// creamos la aplicacion express
const app = express();

//definimos puerto
const PORT = 3000;

//middleware para parsear JSON
app.use(express.json());

//ruta de ejemplo
app.get("/", (req, res) => {
    res.send("Bienvenidos a nuestra aplicacion con express!!");
});

//ruta con parametros
app.get("/saludo/:nombre", (req, res) => {
    const { nombre } = req.params;
    res.json({ mensaje: `Hola, ${nombre}!!!` });
});
//ruta POST para crear un recurso
app.post("/usuarios", (req, res) => {
    const { nombre, email } = req.body;
    //logica para guardar en base de datos
    res.status(201).json({ id: 1, nombre, email });
});
//iniciamos el server
app.listen(PORT, () => {
    console.warn(`Servidor iniciado en http://localhost:${PORT}`);
});
