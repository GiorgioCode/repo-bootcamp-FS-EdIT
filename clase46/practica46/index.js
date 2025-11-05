// conectamos a la base de datos
const mongoose = require("mongoose");

mongoose
    .connect(
        "mongodb+srv://api_user:#####@prueba.8ulixbw.mongodb.net/?appName=prueba"
    )
    .then(() => console.log("conectado a mongoDB"))
    .catch((err) => console.error("Error de conexion:", err));

//creamos un esquema y modelo
const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    edad: { type: Number, min: 0 },
    correo: { type: String, unique: true },
    fechaRegistro: { type: Date, default: Date.now },
});

const Usuario = mongoose.model("Usuario", userSchema);

// C-REATE
// R-EAD
//.U-PDATE
//.D-ELETE

// INSERTAR (CREATE)

const nuevoUsuario = new Usuario({
    nombre: "Juan Vazquez",
    edad: 25,
    correo: "jvazquez@mail.com",
});
nuevoUsuario
    .save()
    .then(() => console.log("usuario guardado correctamente"))
    .catch((err) => console.error("Error al guardar:", err));

// leer (READE)
Usuario.find().then((usuarios) => console.log("usuarios:", usuarios));
Usuario.findOne({ nombre: "Juan Vazquez" }).then((u) =>
    console.log("usuario encontrado ", u)
);

// actualizar (UPDATE)
Usuario.updateOne({ nombre: "Juan Vazquez" }, { edad: 30 })
    .then(() => console.log("Usuario actualizado"))
    .catch((err) => console.error(err));

// eliminar (DELETE)
Usuario.deleteOne({ nombre: "Juan Vazquez" })
    .then(() => console.log("usuario eliminado"))
    .catch((err) => console.error(err));

// validacion

const usuarioInvalido = new Usuario({ edad: 20 });
usuarioInvalido
    .save()
    .catch((err) => console.error("Error de validacion:", err.message));
