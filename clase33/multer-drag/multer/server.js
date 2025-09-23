// importamos modulos necesarios

const express = require("express"); //Framework web para Node.js
const multer = require("multer"); //Middleware para manejar archivos multipart/form-data

const cors = require("cors"); //Middleware para permitir peticiones cross-origin
const path = require("path"); //Modulo para manejar rutas de archivos

const app = express(); //creamos la app de express

//habilitamos CORSS para permitir peticiones desde el frontend
app.use(cors());

//configuramos el almacenamiento para los archivos
const storage = multer.diskStorage({
    //definimos el directorio de se guardan archivos
    destination: function (req, file, cb) {
        cb(null, "uploads/"); //los archivos se guardaran en la carpeta uploads
    },
    //definimos como se nombran los archivos
    filename: function (req, file, cb) {
        //generamos un nombre unico usando timestamp (Date) + EXTENSION ORIGINAL
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

//configuramos multer con las opciones de almacenamiento y limites
const upload = multer({
    storage: storage,
    limits: {
        filesize: 10 * 1024 * 1024, //limitamos el tamaño maximo a 10MB
    },
});

//Definimos la ruta POST para subir archivos
app.post("/upload", upload.single("file"), (req, res) => {
    //verificamos si se recibio un archivo
    if (!req.file) {
        return res.status(400).send("no se subio ningun archivo");
    }
    //si todo esta bien, enviamos respuesta exitosa
    res.send("archivo subido correctamente");
});

//iniciamos el server en el puerto especificado
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
