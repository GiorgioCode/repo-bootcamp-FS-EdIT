const fs = require("fs");

//lectura de archivo
fs.readFile("archivo.txt", "utf-8", (err, data) => {
    if (err) throw err;
    console.log(data);
});

//escritura o creacion de un archivo
fs.writeFile(
    "archivo-generado.txt",
    "Contenido de ejemplo para el archivo que se va a generar",
    (err) => {
        if (err) throw err;
        console.log("Archivo generado!!! =)");
    }
);
