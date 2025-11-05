const mongoose = require("mongoose");

async function main() {
    await mongoose.connect(
        "mongodb+srv://api_user:#####@prueba.8ulixbw.mongodb.net/?appName=prueba"
    );
    console.log("conectado a MongoDB");
    const userSchema = new mongoose.Schema({
        nombre: { type: String, required: true },
        edad: { type: Number, min: 0 },
        correo: { type: String, unique: true },
        fechaRegistro: { type: Date, default: Date.now },
    });
    const Usuario = mongoose.model("Usuario", userSchema);
    const nuevo = new Usuario({
        nombre: "Ana Gomez",
        edad: 22,
        correo: "ana@mail.com",
    });
    await nuevo.save();
    console.log("usuario guardado");
    const lista = await Usuario.find();
    console.log("Lista de usuarios:", lista);
    await Usuario.updateOne({ nombre: "Ana Gomez" }, { edad: 23 });
    console.log("Usuario actualizado");
    const lista2 = await Usuario.find();
    console.log("Lista de usuarios:", lista2);
    await Usuario.deleteOne({ nombre: "Ana Gomez" });
    console.log("Usuario eliminado");
    await mongoose.connection.close();
}
main().catch((err) => console.error("Error:", err));
